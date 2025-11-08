#!/bin/bash
cd "$(dirname "$0")"
echo "🚀 Starting Fujifilm Gallery server..."
echo "📸 Open your browser to: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
python3 -m http.server 8000

