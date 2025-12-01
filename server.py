#!/usr/bin/env python3
import http.server
import socketserver
import os
import json
from urllib.parse import urlparse, parse_qs
from pathlib import Path
from api_galeri import get_categories, get_images

PORT = 5000
DIRECTORY = "."

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def do_GET(self):
        """Handle GET requests"""
        # Parse URL
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        query_params = parse_qs(parsed_url.query)
        
        # API endpoint untuk daftar kategori dan subfolder
        if path == '/api/galeri/categories':
            try:
                categories = get_categories()
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(categories).encode())
                return
            except Exception as e:
                self.send_error(500, str(e))
                return
        
        # API endpoint untuk daftar gambar di subfolder
        elif path == '/api/galeri/images':
            try:
                subfolder_path = query_params.get('path', [''])[0]
                if not subfolder_path:
                    self.send_error(400, "Parameter 'path' diperlukan")
                    return
                
                images = get_images(subfolder_path)
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(images).encode())
                return
            except Exception as e:
                self.send_error(500, str(e))
                return
        
        # Default: serve file static
        super().do_GET()
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == "__main__":
    Handler = MyHTTPRequestHandler
    
    with ReusableTCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Server running at http://0.0.0.0:{PORT}/")
        print(f"Serving files from: {os.path.abspath(DIRECTORY)}")
        print(f"API endpoints:")
        print(f"  - GET /api/galeri/categories")
        print(f"  - GET /api/galeri/images?path=subfolder_path")
        httpd.serve_forever()
