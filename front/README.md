# PhotoAlbum

## What is It ??

Its localhost solution for your photos app. It has a Python (Django) Server for retrieving data, analysing it, and passing it to the front-end React Server.

## Why to use it ??

Imagine you had Goodle Photos kind of capability on your collection of photos, without having to upload it anywhere. You could have your photos library on any folder you say. Apple has it's photos app, but you cannot have a folder wise structure in that, you cannot open a Photo Library on your Windows PC with the same folder, album structure. 

What we have is, just launch your server on any folder, it will analyse its content and run a localhost web application with all the features your photo library could do. You can create albums, sort by date, location, search through photos by image content, etc. 

## How to Use ??

### Backend

https://github.com/shagunbandi/albumify-backend

Run the main.py file with location of your folder containing images. 

```bash
pip install requirements.txt
python main.py <Location to your Photos Folder>
```

This will run the python server on `localhost:8000`

### Frontend

Frontend is hosted on https://shagunbandi.github.io/albumify-frontend/

Or to run it on local:

https://github.com/shagunbandi/albumify-frontend

Install the required node_modules, and start the server

```bash
npm i
npm start
```

This will run the react development server on `localhost:3000`, or you can build the files and and run.

### What do we have right now ??

#### Backend APIs: 
  1. All Photos in all the sub-directory.
  2. All the Photos, Directory Wise.

#### Client Side: 
  1. Photos Tab, this has all the photos
  2. Album Tab, this has All the photos, directory-wise.

### What is Coming ??

#### Client Side :
  - ~~Make a Front End to Display Data~~
  - ~~Make a single page having all photos~~
  - ~~Make another tab displaying data directory wise~~
  - ~~Load more data once previous is done, currently loaading 50 at a time~~
  - ~~Open Image Viewer when selecting a photo.~~
  - Scroll to the selected Image when Image viewer Opened
  - Create New Albums. 
  - Remove the Directory Album if needed.
  - Sort/Search by Metadata/Tags.
  - Make a Music Video from your Photos.
  - Images in Grid Form.

#### Back End:
  - ~~Create Dango Backend to expose APIs~~
  - ~~API returning Directory wise Data~~
  - ~~API returnng all image related files~~
  - Create Database of some sort, to store File Paths, Image Tags, to increase load rate.
  - Return Metadata.
  - Image Recognition, and tag images as well.
  - Create Thumbnails, for faster Data Load.
  - Make an offline Image Tagging Model
  
####  Others:
  1. Make an executable to run the the project more easily.
      a. Use ocliff commands. 
