import React from "react";
import backgroundPattern from "../../assets/images.jpeg";
import illustration404 from "../../assets/404.jpeg";

type NotFoundPageProps = {};

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
   return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white overflow-hidden">
      
      {/* Background image with opacity */}
      <img
        src={backgroundPattern}
        alt="Background pattern"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Content */}
      <h1 className="text-6xl font-extrabold mb-4 z-10">404</h1>
      <h2 className="text-3xl font-semibold mb-2 z-10">Oops! Page Not Found</h2>

      <div className="mt-8 z-10">
        <img
          src={illustration404}
          alt="404 illustration"
          width={256}
          height={144}
          className="h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
        />
      </div>

      <div className="m-6 z-10 max-w-md text-center">
        <p className="text-lg">
          The page you are looking for does not exist. It might have been removed, or you might have entered the wrong URL.
        </p>
      </div>
    </div>
  );

};

export default NotFoundPage;
