"use client";

import Link from "next/link";

const Content = () => {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 border-b bg-hero">
        <div className="container space-y-10 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Community Connection
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Connecting Foreigners and Local Language Learners
              </h2>
              <p className="text-white-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-black-400">
                A community platform for free tour guiding and language
                experiences between foreigners & locals.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="grid max-w-5xl mx-auto items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                We've launched the project since 2023,
              </h3>
              <h5 className="text-2xl font-bold tracking-tighter sm:text-3xl">this is what happened:</h5>
              <ul className="grid gap-6">
                <li className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 rounded-lg">
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Foreigner Connection</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Connect with locals for personalized tour experiences.
                    </p>
                  </div>
                </li>
                <li className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 rounded-lg">
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Language Learning</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Learn languages from native speakers while exploring new
                      places.
                    </p>
                  </div>
                </li>
                <li className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 rounded-lg">
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Cultural Exchange</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Immerse yourself in local cultures and traditions.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="h-full flex justify-center">
              <img
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center transition-transform transform hover:scale-105"
                height="310"
                src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/241392500_3431816103725124_357755031108864987_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=KwP8EE8uG9MAX8X12F2&_nc_ht=scontent.fhan14-2.fna&oh=00_AfCShVIuYyU20W9iRjT62mQjcDA8v5yRfT7sf_i33_ZIPg&oe=65C73479"
                width="550"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <img
            alt="Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center transition-transform transform hover:scale-105"
            height="310"
            src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/241392500_3431816103725124_357755031108864987_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=KwP8EE8uG9MAX8X12F2&_nc_ht=scontent.fhan14-2.fna&oh=00_AfCShVIuYyU20W9iRjT62mQjcDA8v5yRfT7sf_i33_ZIPg&oe=65C73479"
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Connecting Foreigners and Local Language Learners
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                A community platform for free tour guiding and language learning
                experiences between foreigners and locals.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-300"
                href="/app"
              >
                Go to App
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-300"
                href="#"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Content;
