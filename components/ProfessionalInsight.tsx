
import React, { useState } from 'react';
import { Briefcase, CheckCircle, Save, UserCheck, Shield, BarChart2, Download, Home, RefreshCw, Users, Mail } from 'lucide-react';
import { ProfessionalInsight } from '../types';
import { LearningEngine } from '../services/learningEngine';

const ProfessionalInsightForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ProfessionalInsight>>({
    id: crypto.randomUUID(),
    basicInfo: { age: '', city: '', education: '', socioEconomic: '' },
    careerPath: { currentJob: '', sector: '', experienceYears: '', firstJob: '', wasPlanned: 'Yes' },
    skills: { logical: 3, numerical: 3, communication: 3, leadership: 3, physical: 3, creative: 3 },
    education: { degree: '', entranceExams: '', preparationMode: 'Self-study', scholarships: '' },
    outcomes: { salaryRange: '', satisfaction: 3, recommend: 'Yes', keySkills: '' },
    advice: { studentAdvice: '', mistakesToAvoid: '' },
    consent: false,
    timestamp: new Date().toISOString()
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailOptIn, setEmailOptIn] = useState(false);

  const handleChange = (section: keyof ProfessionalInsight, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section] as any,
        [field]: value
      }
    }));
  };

  const handleSkillChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills!,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
        alert("Please provide consent to share anonymized data.");
        return;
    }
    
    setIsSubmitting(true);

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        // Process and Send Data
        LearningEngine.ingestProfessionalData(formData as ProfessionalInsight);
        setSubmitted(true);
    } catch (err) {
        console.error(err);
        alert("There was an error submitting your data. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-8 my-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 animate-fadeIn">
            {/* Header / Banner */}
            <div className="bg-green-50 p-8 text-center border-b border-green-100">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-sm">
                    <CheckCircle size={40} strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Thank You for Sharing!</h2>
                <p className="text-slate-600 max-w-lg mx-auto text-lg leading-relaxed">
                    Your real-world experience is a valuable contribution to our AI Career Intelligence Platform.
                </p>
            </div>

            {/* Impact Section */}
            <div className="p-6 md:p-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <BarChart2 className="text-blue-600" size={20}/> Your Impact
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-600 text-sm">
                                <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                <span>Improves accuracy of <strong>AI-based career guidance</strong> algorithms.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-600 text-sm">
                                <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                <span>Helps students from diverse backgrounds make <strong>informed decisions</strong>.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-600 text-sm">
                                <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                <span>Strengthens our <strong>national talent intelligence</strong> database.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                                <Shield className="text-green-600" size={16}/> Privacy Assurance
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed mb-4">
                                Your data has been successfully anonymized. It will be used strictly for research and model training purposes to enhance recommendation algorithms.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white p-3 rounded-lg border border-slate-100">
                            <Users size={14} className="text-orange-500"/>
                            <span>You are among <strong>1,240+</strong> professionals contributing today.</span>
                        </div>
                    </div>
                </div>

                {/* Email Opt-in */}
                <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <input 
                        type="checkbox" 
                        id="emailUpdates"
                        checked={emailOptIn}
                        onChange={(e) => setEmailOptIn(e.target.checked)}
                        className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor="emailUpdates" className="text-sm text-indigo-900 cursor-pointer flex-1">
                        <span className="font-bold">Stay Updated:</span> Receive quarterly reports on how your data is shaping the platform.
                    </label>
                    <Mail size={20} className="text-indigo-400 hidden sm:block"/>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 border-t border-slate-100">
                    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium shadow-lg shadow-slate-200">
                        <Download size={18}/> Download Certificate
                    </button>
                    <button onClick={() => window.location.reload()} className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium">
                        <Home size={18}/> Return to Dashboard
                    </button>
                </div>

                {/* Submit Another */}
                <div className="text-center">
                    <button onClick={() => window.location.reload()} className="text-orange-600 text-sm font-bold hover:underline flex items-center justify-center gap-1 mx-auto transition-colors">
                        <RefreshCw size={14}/> Submit Another Response
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
           <UserCheck size={14}/> Professional Insight
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Share Your Career Journey</h1>
        <p className="text-slate-500 mt-2 max-w-2xl">
          Help the next generation by sharing your real-world experience. 
          Your data helps our AI learn what truly leads to success in your field.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Sections */}
        <div className="p-6 md:p-8 space-y-8">
            
            {/* A. Basic Info */}
            <section>
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="bg-slate-100 w-6 h-6 rounded flex items-center justify-center text-xs">1</span> Basic Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                        <input type="number" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                            onChange={(e) => handleChange('basicInfo', 'age', e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">City / State</label>
                        <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                            onChange={(e) => handleChange('basicInfo', 'city', e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Highest Education</label>
                        <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                             onChange={(e) => handleChange('basicInfo', 'education', e.target.value)}>
                            <option value="">Select...</option>
                            <option value="10th">10th Pass</option>
                            <option value="12th">12th Pass</option>
                            <option value="Diploma">Diploma / ITI</option>
                            <option value="Graduate">Graduate</option>
                            <option value="PostGraduate">Post Graduate</option>
                            <option value="PhD">PhD</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Economic Background (Growing up)</label>
                        <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                             onChange={(e) => handleChange('basicInfo', 'socioEconomic', e.target.value)}>
                            <option value="">Select (Optional)...</option>
                            <option value="Low">Low Income (EWS)</option>
                            <option value="Mid">Middle Income</option>
                            <option value="High">High Income</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* B. Career Path */}
            <section>
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="bg-slate-100 w-6 h-6 rounded flex items-center justify-center text-xs">2</span> Career Path
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Current Job Title</label>
                        <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Software Engineer, Electrician"
                             onChange={(e) => handleChange('careerPath', 'currentJob', e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Sector</label>
                         <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                             onChange={(e) => handleChange('careerPath', 'sector', e.target.value)} required>
                            <option value="">Select...</option>
                            <option value="IT/Tech">IT / Tech</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Education">Education</option>
                            <option value="Construction">Construction</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Services">Services</option>
                            <option value="Creative/Arts">Creative / Arts</option>
                            <option value="Sports">Sports</option>
                            <option value="Government">Government / PSU</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
                        <input type="number" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                             onChange={(e) => handleChange('careerPath', 'experienceYears', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Was this your planned career?</label>
                        <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2"><input type="radio" name="planned" value="Yes" onChange={(e) => handleChange('careerPath', 'wasPlanned', e.target.value)} /> Yes</label>
                            <label className="flex items-center gap-2"><input type="radio" name="planned" value="No" onChange={(e) => handleChange('careerPath', 'wasPlanned', e.target.value)} /> No</label>
                        </div>
                    </div>
                </div>
            </section>

            {/* C. Skill Mapping */}
            <section>
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="bg-slate-100 w-6 h-6 rounded flex items-center justify-center text-xs">3</span> Skill Self-Assessment (1-5)
                </h3>
                <p className="text-xs text-slate-500 mb-4">Rate your own abilities honestly. 1 = Beginner, 5 = Expert.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(formData.skills!).map(([key, val]) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">{key} Ability</label>
                            <input 
                                type="range" min="1" max="5" step="1" 
                                value={val} 
                                onChange={(e) => handleSkillChange(key, parseInt(e.target.value))}
                                className="w-full accent-indigo-600 cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>Low</span>
                                <span className="font-bold text-indigo-600">{val}</span>
                                <span>High</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* D. Outcome Data */}
            <section>
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="bg-slate-100 w-6 h-6 rounded flex items-center justify-center text-xs">4</span> Career Outcomes
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Current Salary Range (Annual)</label>
                         <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                             onChange={(e) => handleChange('outcomes', 'salaryRange', e.target.value)}>
                            <option value="">Select...</option>
                            <option value="< 3 LPA">Less than ₹3 Lakhs</option>
                            <option value="3-6 LPA">₹3 - ₹6 Lakhs</option>
                            <option value="6-10 LPA">₹6 - ₹10 Lakhs</option>
                            <option value="10-20 LPA">₹10 - ₹20 Lakhs</option>
                            <option value="> 20 LPA">More than ₹20 Lakhs</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Job Satisfaction (1-5)</label>
                        <input type="range" min="1" max="5" className="w-full accent-indigo-600 cursor-pointer"
                             onChange={(e) => handleChange('outcomes', 'satisfaction', parseInt(e.target.value))} />
                    </div>
                </div>
                <div className="mt-4">
                     <label className="block text-sm font-medium text-slate-700 mb-1">What one skill mattered most for your success?</label>
                     <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. English speaking, Coding, Hard work"
                          onChange={(e) => handleChange('outcomes', 'keySkills', e.target.value)} />
                </div>
            </section>

             {/* E. Advice */}
             <section>
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="bg-slate-100 w-6 h-6 rounded flex items-center justify-center text-xs">5</span> Advice for Students
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">What should students know before choosing this career?</label>
                        <textarea className="w-full p-3 border rounded-lg h-24 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Share your wisdom..."
                            onChange={(e) => handleChange('advice', 'studentAdvice', e.target.value)}></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Common mistakes to avoid?</label>
                        <textarea className="w-full p-3 border rounded-lg h-24 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Not focusing on practical skills..."
                            onChange={(e) => handleChange('advice', 'mistakesToAvoid', e.target.value)}></textarea>
                    </div>
                </div>
            </section>

            {/* F. Consent */}
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-start gap-3">
                <input type="checkbox" className="mt-1 w-4 h-4 text-indigo-600 rounded cursor-pointer" 
                    onChange={(e) => setFormData(prev => ({...prev, consent: e.target.checked}))} />
                <div>
                    <label className="text-sm font-bold text-indigo-900 flex items-center gap-1"><Shield size={14}/> Data Privacy Consent</label>
                    <p className="text-xs text-indigo-700 mt-1">
                        I agree to share my anonymized data to improve the AI career guidance model. 
                        No personally identifiable information (Name, Email, Phone) is being collected or stored.
                    </p>
                </div>
            </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Saving...
                    </>
                ) : (
                    <>
                        <Save size={20} /> Submit Profile
                    </>
                )}
            </button>
        </div>

      </form>
    </div>
  );
};

export default ProfessionalInsightForm;
