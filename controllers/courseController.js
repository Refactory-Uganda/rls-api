// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const { AdminAddCourses } = require('../models/adminAddCoursesModel');

// // Define the folder path for uploads
// const uploadFolderPath = path.join(__dirname, '../public/uploads');

// // Check if the upload folder exists, and create it if it doesn't
// if (!fs.existsSync(uploadFolderPath)) {
//   fs.mkdirSync(uploadFolderPath, { recursive: true });
//   console.log(`Upload folder created at ${uploadFolderPath}`);
// } else {
//   console.log(`Upload folder already exists at ${uploadFolderPath}`);
// }

// // Create the storage configuration for Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadFolderPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage }).fields([
//   { name: 'video', maxCount: 1 },
//   { name: 'slide', maxCount: 1 },
//   { name: 'text', maxCount: 1 },
// ]);

// // Define the function to handle file uploads
// const uploadFiles = async (req, res) => {
//   // Handle the file upload using the multer middleware
//   upload(req, res, async function (err) {
//     if (err) {
//       console.log(err);
//       return res.send('Error uploading file.');
//     }

//     try {
//       const courseId = req.params.id;
//       const { video, slide, text } = req.files;

//       const course = await AdminAddCourses.findById(courseId);

//       if (!course) {
//         return res.status(404).json({ message: 'Course not found' });
//       }

//       const contentItem = {};

//       if (video) {
//         contentItem.video = `public/uploads/${video[0].filename}`;
//       }
//       if (text) {
//         contentItem.text = `public/uploads/${text[0].filename}`;
//       }

//       if (slide) {
//         contentItem.slide = `public/uploads/${slide[0].filename}`;
//       }

//       course.content.push(contentItem);
//       await course.save();

//       res.status(200).json({ message: 'Files uploaded successfully', result: contentItem });
//     } catch (error) {
//       res.status(500).json({ message: 'Error uploading files', error });
//       console.error(error);
//     }
//   });
// };

// module.exports = {
//   uploadFiles,
// };

module.exports = {
  uploadFiles :  async (req, res) => {
    // Handle the file upload using the multer middleware
    upload(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.send('Error uploading file.');
      }
  
      try {
        const courseId = req.params.id;
        const { video, slide, text } = req.files;
  
        const course = await AdminAddCourses.findById(courseId);
  
        if (!course) {
          return res.status(404).json({ message: 'Course not found' });
        }
  
        const contentItem = {};
  
        if (video) {
          contentItem.video = `public/uploads/${video[0].filename}`;
        }
        if (text) {
          contentItem.text = `public/uploads/${text[0].filename}`;
        }
  
        if (slide) {
          contentItem.slide = `public/uploads/${slide[0].filename}`;
        }
  
        course.content.push(contentItem);
        await course.save();
  
        res.status(200).json({ message: 'Files uploaded successfully', result: contentItem });
      } catch (error) {
        res.status(500).json({ message: 'Error uploading files', error });
        console.error(error);
      }
    });
  }
};
