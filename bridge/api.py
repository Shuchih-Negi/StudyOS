import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, request, jsonify
from flask_cors import CORS
from agents.orchestrator import Orchestrator

app = Flask(__name__)
CORS(app)

@app.route('/api/process', methods=['POST'])
def process_student():
    try:
        data = request.json
        orchestrator = Orchestrator()
        result = orchestrator.process_student(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)