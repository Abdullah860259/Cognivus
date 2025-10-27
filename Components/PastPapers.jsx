import React, { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { useRouter } from "next/navigation";

const PastPapers = () => {
  const [pastPapers, setPastPapers] = useState([]);
  const { setLoading } = useLoading();
  const router = useRouter();


  const fetchPastPapers = async () => {
    let res = await fetch(`/api/pastpapers`);
    let data = await res.json();
    setPastPapers(data);
    setLoading(false);
  };

  const solvePaper = (paper) => {
    console.log(paper)
    router.push(`/mcqs?referenceName=${paper.referenceName}&conductor=${paper.conductor}&year=${paper.year}&time=${paper.time}&pastPaper=true&reverseTime=true`);
  };


  useEffect(() => {
    setLoading(true);
    fetchPastPapers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Available Past Papers</h2>

      {pastPapers.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pastPapers.map((paper, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {paper.referenceName} ({paper.year})
              </h3>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Conductor:</span>{" "}
                {paper.conductor}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Time:</span> {paper.time} hrs
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                  Past Paper
                </span>
                <button
                  type="button"
                  onClick={() => { solvePaper(paper) }}
                  className="px-5 py-2.5 bg-blue-600 cursor-pointer text-white font-medium rounded-lg shadow-sm 
               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 
               transition disabled:opacity-50 disabled:cursor-not-allowed select-none"
                >
                  Solve Paper
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No past papers found</p>
      )}
    </div>
  );
};

export default PastPapers;
