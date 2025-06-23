"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function CandidateForm() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
    skills: "",
    previous_job: "",
    current_salary: "",
    expected_salary: "",
    profile_pic: null as File | null,
    pan_card: null as File | null,
    aadhar_card: null as File | null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();

      if (userData?.user) {
        setUser(userData.user);

        const { data, error } = await supabase
          .from("candidates")
          .select("*")
          .eq("email", userData.user.email)
          .single();

        if (!error && data) {
          setForm((prev) => ({
            ...prev,
            name: data.name || "",
            address: data.address || "",
            skills: data.skills || "",
            previous_job: data.previous_job || "",
            current_salary: data.current_salary?.toString() || "",
            expected_salary: data.expected_salary?.toString() || "",
          }));
        }
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadFile = async (file: File, field: string) => {
    const supabase = createClient();
    const filePath = `${user?.email}/${field}-${Date.now()}`;
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error(`Error uploading ${field}:`, error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("documents")
      .getPublicUrl(data.path);
    return urlData.publicUrl;
  };

  const handleSubmit = async () => {
    const supabase = createClient();

    // Upload files if selected
    const profile_pic_url = form.profile_pic ? await uploadFile(form.profile_pic, "profile_pic") : null;
    const pan_card_url = form.pan_card ? await uploadFile(form.pan_card, "pan_card") : null;
    const aadhar_card_url = form.aadhar_card ? await uploadFile(form.aadhar_card, "aadhar_card") : null;

    // Upsert (insert or update)
    const { error } = await supabase.from("candidates").upsert({
      email: user?.email,
      name: form.name,
      address: form.address,
      skills: form.skills,
      previous_job: form.previous_job,
      current_salary: Number(form.current_salary),
      expected_salary: Number(form.expected_salary),
      ...(profile_pic_url && { profile_pic: profile_pic_url }),
      ...(pan_card_url && { pan_card: pan_card_url }),
      ...(aadhar_card_url && { aadhar_card: aadhar_card_url }),
    });

    if (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile.");
    } else {
      alert("Profile saved successfully!");
    }
  };

  return (
    <div className="container my-5 p-4 shadow rounded bg-white" style={{ maxWidth: "800px" }}>
      <h2 className="mb-4 text-primary border-bottom pb-2">Candidate Profile</h2>

      {/* Personal Info */}
      <div className="mb-4">
        <h5 className="text-secondary mb-3">Personal Information</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" value={form.name} className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={user?.email || ""} disabled />
          </div>
          <div className="col-12">
            <label className="form-label">Address</label>
            <textarea name="address" className="form-control" rows={2} value={form.address} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="mb-4">
        <h5 className="text-secondary mb-3">Job Details</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Skills</label>
            <input type="text" name="skills" value={form.skills} className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Previous Job</label>
            <input type="text" name="previous_job" value={form.previous_job} className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Current Salary (₹)</label>
            <input type="number" name="current_salary" value={form.current_salary} className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Expected Salary (₹)</label>
            <input type="number" name="expected_salary" value={form.expected_salary} className="form-control" onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Document Upload */}
      <div className="mb-4">
        <h5 className="text-secondary mb-3">Upload Documents</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Profile Picture</label>
            <input type="file" name="profile_pic" className="form-control" accept="image/*" onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">PAN Card</label>
            <input type="file" name="pan_card" className="form-control" accept="image/*" onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Aadhar Card</label>
            <input type="file" name="aadhar_card" className="form-control" accept="image/*" onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="text-end">
        <button className="btn btn-primary px-4" onClick={handleSubmit}>
          Save Profile
        </button>
      </div>
    </div>
  );
}
