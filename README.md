# QuadTree System

This project visualizes a **QuadTree** data structure using `p5.js` and integrates an interactive GUI for dynamic configurations. A QuadTree is a spatial partitioning data structure commonly used for tasks such as collision detection, spatial querying, and optimization in 2D space.

## Features
- **QuadTree Visualization**: Displays the QuadTree structure dynamically as it partitions the space.
- **Interactive GUI**: Adjust parameters like the number of points, capacity per quadrant, range size, and background color in real-time using a GUI.
- **Spatial Querying**: 
  - Highlights points within a specified range (controlled by the mouse).
  - Finds and highlights the nearest neighbor to the mouse pointer.
- **Dynamic Updates**: Changes to the GUI parameters dynamically regenerate the QuadTree and update the canvas.

## How It Works
1. The canvas is divided into a QuadTree structure, with each rectangle subdividing further when it exceeds the specified capacity.
2. The mouse pointer acts as the querying tool:
   - A yellow rectangle shows the query range.
   - Points within the query range are highlighted in green.
   - The nearest neighbor to the mouse pointer is connected with a red line.
