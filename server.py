#!/usr/bin/env python3
"""
Lightweight development server for Parthasarathi Kannan's Cyberpunk Developer Portfolio.
Runs with standard Python library (no dependencies required).
"""

import http.server
import socketserver
import sys
import webbrowser

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Disable caching for instant local development feedback
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

def run_server():
    port = PORT
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass

    with socketserver.TCPServer(("", port), Handler) as httpd:
        print("=" * 65)
        print(" [CYBERPUNK DEV PORTFOLIO] PARTHASARATHI KANNAN")
        print(f" Local Server Running: http://localhost:{port}")
        print(f" PDF Resume Path:     http://localhost:{port}/assets/docs/Parthasarathi_Kannan_Resume.pdf")
        print(f" Web Resume View:     http://localhost:{port}/resume.html")
        print(" Press CTRL+C to stop the server.")
        print("=" * 65)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server gracefully...")

if __name__ == '__main__':
    run_server()
