/**
 * How to host using firebase (Console.firebase.google.com)
 * Steps:
 * 1.First we need to go to the build option and then check the host option
 * 2.To host we need to install the following options first:
 * 3.npm install -g firebase-tools
 * 4.firebase login
 * 5.firebase init
 * 6.After the firebase init then we have to answer some questions:
 * a.there will be many options but we will choose  Hosting option using down 
 * arrow and spacebar to confirm that choice\
 * b.then we will choose the existing project option because for email and
 * password authentication I have already made this project in the firebase
 * c.There will be many existing projects with the same name so we have to be
 * careful about choosing
 * d.now to build the project we need to make a dist folder because they will
 * ask a question which is which folder is needed to be used as the public
 * directory>>> The ans will be dist (if we use vit)
 * (For create react app--> it will be build folder)
 * e.Single page app: We need to answer y
 * f. continous deployment: then n
 * 
 * 
 * For every time to time deploy we need to write:
 * 1.npm run build
 * 2.firebase deploy
 * 
 * 
 */