"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">500</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            网站暂时不可用
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            服务器出了点小差，喝一杯咖啡吧☕️
          </p>
          <p className={'mt-6 p-3 bg-secondary max-w-3xl rounded-md font-light'}>{error.message}</p>
        </div>
      </main>
    </>
  );
}
