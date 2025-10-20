import React from 'react';

export const DealsSection = ({ title, deals }) => {
  return (
    <div className="bg-white rounded-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button className="text-blue-600 font-medium hover:text-blue-800">
          View All
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {deals.map((deal) => (
          <div key={deal.id} className="group">
            <div className="relative overflow-hidden rounded-sm">
              <img 
                src={deal.image} 
                alt={deal.title} 
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 flex items-end">
                <div className="bg-white bg-opacity-90 w-full py-2 px-3">
                  <h3 className="font-medium text-gray-800 text-sm">{deal.title}</h3>
                  <p className="text-red-500 text-xs font-bold">{deal.discount}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};