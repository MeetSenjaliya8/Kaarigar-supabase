// "use client";

// import { useEffect, useState } from "react";
// import { createClient } from "@/utils/supabase/client";
// import { User } from "@supabase/supabase-js";
// import Image from "next/image";

// export default function CandidateDashboard() {
//   const [user, setUser] = useState<User | null>(null);
//   const [profile, setProfile] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const supabase = createClient();
//       const { data: userData } = await supabase.auth.getUser();

//       if (userData?.user) {
//         setUser(userData.user);

//         const { data, error } = await supabase
//           .from("candidates")
//           .select("*")
//           .eq("email", userData.user.email)
//           .single();

//         if (!error) {
//           setProfile(data);
//         }
//       }
//     };
//     console.log(profile, "profile data")
//     fetchData();
//   }, []);

//   if (!profile) return <div className="text-center my-5">Loading...</div>;

//   return (
//     <div className="container my-5 p-4 bg-white rounded shadow" style={{ maxWidth: "900px" }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div className="d-flex align-items-center">
//           {/* {profile.profile_pic && (
//             <Image
//               src={profile.profile_pic}
//               alt="Profile Picture"
//               width={80}
//               height={80}
//               className="rounded-circle me-3"
//             />
//           )} */}
//           <div>
            
//             <h4 className="mb-1">{profile.name}</h4>
//             <p className="mb-0 text-muted">Jewellery Designer</p>
//             <p className="mb-0 text-muted">Based in {profile.address}</p>
//           </div>
//         </div>
//         <button className="btn btn-outline-primary">Edit Profile</button>
//       </div>

//       <section className="mb-4">
//         <h5 className="text-secondary">About</h5>
//         <p>
//           {profile.skills && profile.skills.length > 0
//             ? `Sophia is a highly skilled jewellery designer with expertise in ${profile.skills}. She is known for her attention to detail and commitment to quality.`
//             : "No about info provided."}
//         </p>
//       </section>

//       <section className="mb-4">
//         <h5 className="text-secondary">Portfolio</h5>
//         <div className="row g-3">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="col-md-4">
//               <div className="border rounded overflow-hidden">
//                 <Image
//                   src={`https://via.placeholder.com/300x300?text=Portfolio+${i}`}
//                   alt={`Portfolio ${i}`}
//                   width={300}
//                   height={300}
//                   className="img-fluid"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="mb-4">
//         <h5 className="text-secondary">Skills</h5>
//         <div className="d-flex flex-wrap gap-2">
//           {profile.skills
//             ?.split(",")
//             .map((skill: string, index: number) => (
//               <span key={index} className="badge bg-light text-dark border">
//                 {skill.trim()}
//               </span>
//             )) || <span>No skills listed</span>}
//         </div>
//       </section>

//       <section className="mb-4">
//         <h5 className="text-secondary">Experience Level</h5>
//         <p>Senior (8+ years)</p>
//       </section>

//       <section className="mb-4">
//         <h5 className="text-secondary">Certifications</h5>
//         <p>Certified Jewellery Professional (CJP)</p>
//       </section>

//       <section>
//         <h5 className="text-secondary mb-3">Job Application History</h5>
//         <table className="table table-bordered">
//           <thead className="table-light">
//             <tr>
//               <th>Job Title</th>
//               <th>Company</th>
//               <th>Date Applied</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Senior Jewellery Designer</td>
//               <td><a href="#">Luxury Jewels Inc.</a></td>
//               <td>2024-03-15</td>
//               <td><span className="badge bg-info text-dark">Interviewing</span></td>
//             </tr>
//             <tr>
//               <td>Diamond Setter</td>
//               <td><a href="#">Sparkle Gems Ltd.</a></td>
//               <td>2024-02-20</td>
//               <td><span className="badge bg-danger">Rejected</span></td>
//             </tr>
//             <tr>
//               <td>Metalwork Specialist</td>
//               <td><a href="#">Crafted Creations</a></td>
//               <td>2024-01-10</td>
//               <td><span className="badge bg-success">Accepted</span></td>
//             </tr>
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// }
