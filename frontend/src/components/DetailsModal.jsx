import React from "react";

const DetailsModal = ({ open, onClose, scheme, onApply }) => {
  if (!open || !scheme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 z-60 p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{scheme.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">Close</button>
        </div>

        <p className="text-sm text-gray-600 mt-2">{scheme.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-medium">Benefits</h4>
            <p className="text-sm text-gray-700">{scheme.benefits}</p>

            <h4 className="font-medium mt-3">Eligibility</h4>
            <p className="text-sm text-gray-700">{scheme.eligibility}</p>
          </div>

          <div>
            <h4 className="font-medium">Required Documents</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {scheme.documents && scheme.documents.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            <div className="mt-3 text-sm text-gray-600">
              <div><strong>Deadline:</strong> {scheme.deadline}</div>
              <div className="mt-1"><strong>State:</strong> {scheme.state}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <a href={scheme.applicationLink} target="_blank" rel="noreferrer" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Open Application</a>
          {scheme.downloadLink && (
            <a href={scheme.downloadLink} target="_blank" rel="noreferrer" className="px-4 py-2 border rounded">Download Form</a>
          )}
          {/* <button onClick={() => onApply(scheme)} className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply Now</button> */}
        </div>
      </div>
    </div>
  );
};
export default DetailsModal;
