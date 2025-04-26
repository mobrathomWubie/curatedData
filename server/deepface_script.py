from deepface import DeepFace
import sys
import json

def verify_faces(img1_path, img2_path):
    result = DeepFace.verify(img1_path, img2_path)
    return result

if __name__ == "__main__":
    img1_path = sys.argv[1]
    img2_path = sys.argv[2]
    result = verify_faces(img1_path, img2_path)
    print(json.dumps(result))  # Output the result as JSON