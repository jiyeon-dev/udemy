# unsplash images

React Query 활용 프로젝트

[Unsplash Images](https://www.figma.com/file/O2MaAAlr4nznh7m53azatL/Unsplash-images?node-id=0%3A1&t=cYDOCgqOs9IX2If0-1)

### How to set unsplash developer api access key environment.

1. create `.env` file at project root folder
2. create variable.
   it must be start with `VITE_`
   ```env
   VITE_API_KEY=키값
   ```
3. insert into code.

   ```javascript
   import.meta.env.키;

   // example
   const url = `https://api.unsplash.com/search/photos?client_id=${
     import.meta.env.VITE_API_KEY
   }`;
   ```

4. `.env` file must be included in `.gitignore`
