
import os
import httpx
import numpy as np
from PIL import Image
from io import BytesIO
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator, img_to_array
from tensorflow.keras.applications.resnet50 import preprocess_input

# Load the trained model
model_path = r'C:\\New folder\\resnet50_best_model.keras'

# Check if the model path exists
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at {model_path}")

model = load_model(model_path)

# Recreate the ImageDataGenerator to automatically get class indices
train_dir = r'C:\\New folder\\new model\\archive\\New Plant Diseases Dataset(Augmented)\\New Plant Diseases Dataset(Augmented)\\train'

# Check if the train directory exists
if not os.path.exists(train_dir):
    raise FileNotFoundError(f"Training directory not found at {train_dir}")

train_datagen = ImageDataGenerator(rescale=1./255)

# Create a generator to get the class_indices
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(224, 224),  # Use the size the model expects
    batch_size=32,
    class_mode='categorical'
)

# Extract class indices
class_indices = train_generator.class_indices

# Inverse the class_indices to get labels
class_labels = {v: k for k, v in class_indices.items()}

# Function to fetch and preprocess image
def fetch_and_preprocess_image(image_url):
    try:
        # Fetch image using httpx
        response = httpx.get(image_url)
        response.raise_for_status()  # Raise an error for bad responses
    except httpx.HTTPStatusError as http_err:
        print(f"HTTP error occurred: {http_err}")
        return None
    except Exception as err:
        print(f"An error occurred while fetching the image: {err}")
        return None

    try:
        # Load image and convert to RGB (if needed)
        img = Image.open(BytesIO(response.content)).convert('RGB')
        # Resize image to 224x224 pixels (the input size expected by ResNet50)
        img = img.resize((224, 224))
        # Convert image to array
        img_array = img_to_array(img)
        # Expand dimensions to fit the model's input shape (1, 224, 224, 3)
        img_array = np.expand_dims(img_array, axis=0)
        # Preprocess image (scale pixel values, etc.)
        img_array = preprocess_input(img_array)

        return img_array

    except Exception as e:
        print(f"Error processing the image: {e}")
        return None

# Function to predict disease from an image URL for a specific crop
def predict_disease(image_url, crop_name=None):
    try:
        # Filter class indices for the specific crop
        crop_classes = {idx: label for label, idx in class_indices.items() if label.startswith(crop_name)}
        
        if not crop_classes:
            print(f"No classes found for crop '{crop_name}'. Ensure the crop name matches exactly (case-sensitive).")
            return
        
        # Preprocess the image
        img_array = fetch_and_preprocess_image(image_url)
        
        if img_array is None:
            print("Image preprocessing failed.")
            return
        
        # Predict using the model
        predictions = model.predict(img_array)

        # Get only the relevant class predictions for the specified crop
        crop_indices = list(crop_classes.keys())  # Get the indices of the crop-related classes
        crop_predictions = predictions[0][crop_indices]  # Index using crop_indices to get relevant predictions

        # Find the index with the highest prediction confidence within the crop-related classes
        best_index = np.argmax(crop_predictions)  # Get the index of the highest prediction within filtered results
        predicted_label = crop_classes[crop_indices[best_index]]  # Map back to the class label using the filtered indices

        print(f"Crop: {crop_name}")
        print(f"Predicted disease: {predicted_label} with confidence {crop_predictions[best_index]:.2f}")

    except Exception as e:
        print(f"Error during prediction: {e}")

# Example usage
image_url = "https://extension.umn.edu/sites/extension.umn.edu/files/commonrust2_600px.jpg"
crop_name = "Corn"  # Make sure to use the correct crop prefix
predict_disease(image_url, crop_name)
