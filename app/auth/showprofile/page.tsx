// /app/showprofile/page.tsx
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function ShowProfile() {
  const supabase = createClient();

  // Get the logged-in user
  const { data: { user } } = await (await supabase).auth.getUser();

  if (!user) return <p className="p-4">Please log in to view your profile.</p>;

  // Fetch profile by email
  const { data: profile } = await (await supabase)
    .from("profiles")
    .select("*")
    .eq("email", user.email)
    .single();

  if (!profile) return <p className="p-4">No profile found.</p>;

  // Get public URLs for uploaded files
  const getUrl = async (path: string | null) =>
    path ? (await supabase).storage.from("documents").getPublicUrl(path).data.publicUrl : null;

  const profilePicUrl = getUrl(profile.profile_pic_url);
  const aadhaarUrl = getUrl(profile.aadhaar_url);
  const panUrl = getUrl(profile.pan_url);
  const resumeUrl = getUrl(profile.resume_url);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h1>

      <div className="flex items-center gap-4">
        {/* {profilePicUrl && (
          <Image
            src={profilePicUrl}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        )} */}
        <div>
          <p className="text-lg font-semibold">{profile.name}</p>
          <p className="text-sm text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Skills:</strong> {profile.skills}</p>
        <p><strong>Current Salary:</strong> ₹{profile.current_salary}</p>
        <p><strong>Expected Salary:</strong> ₹{profile.expected_salary}</p>
      </div>

      {/* <div className="mt-6 space-y-2 text-sm">
        {aadhaarUrl && (
          <p>
            <strong>Aadhaar:</strong>{" "}
            <a href={aadhaarUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Aadhaar</a>
          </p>
        )}
        {panUrl && (
          <p>
            <strong>PAN Card:</strong>{" "}
            <a href={panUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View PAN</a>
          </p>
        )}
        {resumeUrl && (
          <p>
            <strong>Resume:</strong>{" "}
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Resume</a>
          </p>
        )}
      </div> */}
    </div>
  );
}
