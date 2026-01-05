import "./Shortlet.css";
import { useState } from "react";
import { toast } from "sonner";

export default function Shortlet() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: "+234",
    phone: "",
    email: "",
    agreeToEmails: false,
    checkIn: "",
    checkOut: "",
    location: "",
    guests: "",
    bedrooms: "",
    budget: "",
    isParty: false,
    amenities: {
      pool: false,
      gym: false,
      games: false,
      cinema: false,
    },
    additionalNotes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => {
    if (name in formData.amenities) {
      setFormData((prev) => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [name]: !prev.amenities[name as keyof typeof prev.amenities],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: !prev[name as keyof typeof prev],
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const timestamp = `${day}/${month}/${year} ${hours}:${minutes}`;

    const submissionData = {
      ...formData,
      phone: `${formData.countryCode}${formData.phone}`,
      timeFilled: timestamp,
    };

    try {
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      const response = await fetch(`${GOOGLE_SCRIPT_URL}?sheet=Shortlet`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        console.log("Form submitted:", submissionData);
        toast.success("Request Submitted!", {
          description:
            "Thank you for your request! We will contact you soon with available options.",
          duration: 5000,
        });

        setFormData({
          fullName: "",
          countryCode: "+234",
          phone: "",
          email: "",
          agreeToEmails: false,
          checkIn: "",
          checkOut: "",
          location: "",
          guests: "",
          bedrooms: "",
          budget: "",
          isParty: false,
          amenities: {
            pool: false,
            gym: false,
            games: false,
            cinema: false,
          },
          additionalNotes: "",
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Submission Failed", {
        description:
          "There was an error submitting your request. Please try again or contact us directly.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1">
      <div className="container py-8 md:py-12 max-w-2xl">
        <a
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-arrow-left w-4 h-4"
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          Back to Home
        </a>
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Find your perfect stay in Lagos
          </h1>
          <p className="text-muted-foreground">
            Fill in the details below and we'll find the best shortlet options
            for you.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div
            className="form-section space-y-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="font-semibold text-lg mb-4">Personal Information</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Full Name
              </label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-11"
                placeholder="Enter your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Whatsapp Number
              </label>
              <div className="flex gap-2">
                <select
                  className="flex h-10 w-[140px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-11"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                >
                  <option value="+234">🇳🇬 +234</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+39">🇮🇹 +39</option>
                  <option value="+27">🇿🇦 +27</option>
                  <option value="+254">🇰🇪 +254</option>
                  <option value="+233">🇬🇭 +233</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+966">🇸🇦 +966</option>
                  <option value="+65">🇸🇬 +65</option>
                </select>
                <input
                  type="tel"
                  className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-11"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email Address
              </label>
              <input
                type="email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-11"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-row items-start space-x-3 space-y-0">
              <input
                type="checkbox"
                className="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                checked={formData.agreeToEmails}
                onChange={() => handleCheckboxChange("agreeToEmails")}
                id="newsletter-checkbox"
              />
              <div className="space-y-1 leading-none">
                <label
                  htmlFor="newsletter-checkbox"
                  className="cursor-pointer font-normal text-sm text-muted-foreground"
                >
                  I agree to receive occasional emails about property deals and
                  updates from Ekohomesng
                </label>
              </div>
            </div>
          </div>
          <div
            className="form-section space-y-4 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="font-semibold text-lg mb-4">Stay Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 flex flex-col">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Check-in Date
                </label>
                <input
                  type="date"
                  className="flex h-10 w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2 flex flex-col">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Check-out Date
                </label>
                <input
                  type="date"
                  className="flex h-10 w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Preferred Location
              </label>
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                name="location"
                value={formData.location}
                onChange={(e) => handleSelectChange("location", e.target.value)}
                required
              >
                <option value="">Select a location</option>
                <option value="Lekki (Phase 1, Ikate, ...)">
                  Lekki (Phase 1, Ikate, ...)
                </option>
                <option value="Ikoyi">Ikoyi</option>
                <option value="Victoria Island">Victoria Island</option>
                <option value="Ikeja">Ikeja</option>
                <option value="Yaba">Yaba</option>
                <option value="Surulere">Surulere</option>
                <option value="Gbagada">Gbagada</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Number of Guests
                </label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[44px]"
                  placeholder="e.g. 2"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Number of Bedrooms
                </label>
                <select
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    handleSelectChange("bedrooms", e.target.value)
                  }
                  required
                >
                  <option value="">Select bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5+">5+ Bedrooms</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Budget per Night
              </label>
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                name="budget"
                value={formData.budget}
                onChange={(e) => handleSelectChange("budget", e.target.value)}
                required
              >
                <option value="">Select budget</option>
                <option value="60k-100k">₦60k - ₦100k</option>
                <option value="100k-200k">₦100k - ₦200k</option>
                <option value="200k-300k">₦200k-₦300k</option>
                <option value="300k+">₦300k+</option>
              </select>
            </div>
            <div className="space-y-2 flex flex-row items-center justify-between rounded-lg border border-border p-4 bg-background">
              <div className="space-y-0.5">
                <label
                  htmlFor="party-checkbox"
                  className="font-medium cursor-pointer text-base"
                >
                  Is this for a party or get-together?
                </label>
                <p className="text-sm text-muted-foreground">
                  Let us know if you're planning an event so we can find
                  suitable properties
                </p>
              </div>
              <input
                type="checkbox"
                className="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                checked={formData.isParty}
                onChange={() => handleCheckboxChange("isParty")}
                id="party-checkbox"
              />
            </div>
          </div>
          <div
            className="form-section space-y-4 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="font-semibold text-lg mb-4">Preferred Amenities</h2>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 space-y-0">
                  <input
                    type="checkbox"
                    className="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                    checked={formData.amenities.pool}
                    onChange={() => handleCheckboxChange("pool")}
                    id="pool-checkbox"
                  />
                  <label
                    htmlFor="pool-checkbox"
                    className="text-sm leading-none cursor-pointer font-normal"
                  >
                    Swimming Pool
                  </label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                  <input
                    type="checkbox"
                    className="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                    checked={formData.amenities.gym}
                    onChange={() => handleCheckboxChange("gym")}
                    id="gym-checkbox"
                  />
                  <label
                    htmlFor="gym-checkbox"
                    className="text-sm leading-none cursor-pointer font-normal"
                  >
                    Gym/Fitness Center
                  </label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                  <input
                    type="checkbox"
                    className="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                    checked={formData.amenities.games}
                    onChange={() => handleCheckboxChange("games")}
                    id="games-checkbox"
                  />
                  <label
                    htmlFor="games-checkbox"
                    className="text-sm leading-none cursor-pointer font-normal"
                  >
                    Games (PlayStation, Snooker, Pool Table)
                  </label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                  <input
                    type="checkbox"
                    className="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                    checked={formData.amenities.cinema}
                    onChange={() => handleCheckboxChange("cinema")}
                    id="cinema-checkbox"
                  />
                  <label
                    htmlFor="cinema-checkbox"
                    className="text-sm leading-none cursor-pointer font-normal"
                  >
                    Cinema
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div
            className="form-section space-y-4 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="font-semibold text-lg mb-4">Additional Notes</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Anything else we should know? (Optional)
              </label>
              <textarea
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px] resize-none"
                placeholder="E.g., specific location not listed above, special requirements, accessibility needs..."
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 w-full min-h-[48px]"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </main>
  );
}
