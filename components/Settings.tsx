"use client";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { FaCog } from "react-icons/fa";

export default function Settings(props: {
  user: User;
  logoutUser: string;
  apiKey: string | undefined;
}) {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | undefined>(props.apiKey);

  const generateAPIKey = async () => {
    const request = await fetch(`/api/generate-key`, {
      method: "POST",
    });

    const response = await request.json();

    if (response?.apiKey) {
      setApiKey(response.apiKey);
    }
  };

  return (
    <div>
      <div className="border-t border-stone-700 text-white p-[1.4rem] overflow-hidden">
        <div
          className="flex items-center space-x-[0.7rem] cursor-pointer"
          onClick={() => setSettingsOpen(true)}
        >
          <FaCog size={24} />
          <span className="text-[22.4px]">Settings</span>
        </div>
      </div>

      {!settingsOpen ? null : (
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/80 z-[100]">
          <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
            <div className="bg-white p-4 max-w-xs w-full rounded-lg flex flex-col space-y-[0.7rem]">
              <div className="flex flex-col space-y-1">
                <label>API Key</label>
                {apiKey ? (
                  <input
                    type="text"
                    className="w-full bg-gray-100 rounded-md p-3 text-slate-90"
                    readOnly
                    value={apiKey}
                  />
                ) : (
                  <button
                    onClick={generateAPIKey}
                    className="bg-slate-700 p-3 text-white rounded-md cursor-pointer w-full"
                  >
                    Generate API Key
                  </button>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <label>Email</label>
                <input
                  type="text"
                  className="w-full bg-gray-100 rounded-md p-3 text-slate-90"
                  readOnly
                  value={props?.user.email}
                />
              </div>

              <div className="w-full flex items-center justify-between space-x-4">
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="bg-slate-700 p-3 text-white rounded-md cursor-pointer w-full"
                >
                  Close
                </button>
                <a href={props.logoutUser} className="w-full">
                  <button className="bg-red-700/90 text-white rounded-md p-3 w-full cursor-pointer">
                    Logout
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
