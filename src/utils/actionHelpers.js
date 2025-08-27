import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export const getActionStyle = (action) => {
  // Priority: Required (neither optional nor recommended) > Recommended > Optional
  if (!action.isOptional && !action.isRecommended) {
    // Required: Light red border
    return "border-l-4 border-red-400 bg-gray-800 text-gray-200 border border-red-400";
  } else if (action.isRecommended) {
    // Recommended: Green border (regardless of optional status)
    return "border-l-4 border-green-600 bg-gray-800 text-gray-200 border border-green-600";
  } else {
    // Optional: Gray border
    return "border-l-4 border-gray-600 bg-gray-800 text-gray-400 border border-gray-600";
  }
};

export const getActionIcon = (action) => {
  // Priority: Required > Recommended > Optional
  if (!action.isOptional && !action.isRecommended) {
    return <AlertCircle className="w-4 h-4 text-red-400" />;
  } else if (action.isRecommended) {
    return <CheckCircle2 className="w-4 h-4 text-green-600" />;
  } else {
    return <Clock className="w-4 h-4 text-gray-600" />;
  }
};

export const getActionTag = (action) => {
  // Priority: Required > Recommended > Optional
  if (!action.isOptional && !action.isRecommended) {
    return {
      text: "Required",
      className: "text-xs px-2 py-1 rounded bg-red-800 text-red-300 border border-red-700"
    };
  } else if (action.isRecommended) {
    return {
      text: "Recommended", 
      className: "text-xs px-2 py-1 rounded bg-green-800 text-green-300 border border-green-700"
    };
  } else {
    return {
      text: "Optional",
      className: "text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 border border-gray-600"
    };
  }
};