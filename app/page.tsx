import React from "react"

export default function Home() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-primary dark:text-primary">Hello there</h1>
          <p className="py-6 text-gray-700 dark:text-white">
            This Website will be used to provide multiple services.
            In order <span className={"text-sky-600 dark:text-primary"}>to start</span> using this Dashboard, navigate to any page using the NavigationBar at the top of the page.
          </p>
          <p className="pt-4 text-secondary dark:text-secondary-content text-xl">Lets get to work!</p>
        </div>
      </div>
    </div>
  )
}
