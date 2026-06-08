import type {
  ContentSection,
  FAQ,
  ProcessStep,
  Testimonial,
} from "@/content/types";

/** The 8-part authority guide — core SEO long-form content for the home page. */
export const authorityGuide: ContentSection[] = [
  {
    heading: "More Than Just Glass: The Structural Integrity of Your Vehicle",
    body: [
      "When most drivers look at their windshield, they see a simple sheet of glass that keeps the wind and rain out. In truth, your windshield is a load-bearing member of your vehicle's safety cage. Bonded to the frame with structural urethane, it works alongside the A-pillars and roof to resist deformation during a crash. In a front-end collision, the windshield can account for up to 45% of the cabin's structural integrity; in a rollover, that figure climbs to roughly 60%, helping keep the roof from collapsing onto the occupants.",
      "This is why the quality of an auto glass installation is never cosmetic. A windshield that is bonded with cheap adhesive, set on a contaminated pinch weld, or made from substandard glass can fail precisely when you need it most. At Glass Genie, every replacement is performed to restore your vehicle to its original engineered safety specification — nothing less.",
    ],
  },
  {
    heading: "The Hidden Dangers of Ignoring Windshield Chips and Cracks",
    body: [
      "A chip the size of a dime seems harmless, but it is a structural weak point under constant stress. Temperature swings, road vibration, potholes, and even the pressure of slamming a door can cause that chip to spider into a crack that crosses your entire field of vision. Once a crack reaches the edge of the glass or the driver's line of sight, the windshield is no longer repairable and must be replaced.",
      "Beyond the safety risk, a cracked windshield can earn you a citation in Texas if it obstructs the driver's view. The smart move is always to address damage early. A resin repair performed within days of the chip appearing restores strength, halts the spread, and costs a fraction of a full replacement — often with no out-of-pocket cost when insurance is involved.",
    ],
  },
  {
    heading:
      "The Critical Importance of Advanced Driver Assistance Systems (ADAS) Calibration",
    body: [
      "The majority of vehicles built in the last several years rely on a forward-facing camera mounted to the windshield. This single camera feeds lane-departure warning, automatic emergency braking, adaptive cruise control, and traffic-sign recognition. When the windshield is replaced, that camera is disturbed — and even a millimeter of misalignment translates into a meaningful aiming error at highway distances.",
      "An uncalibrated camera does not simply stop working; worse, it can work incorrectly, braking late or reading the wrong lane. That is why ADAS calibration is a mandatory step in any modern windshield replacement, not an optional upsell. Glass Genie performs both static (target-based) and dynamic (road-driven) calibration on-site using factory-spec equipment, then verifies the systems before returning your keys.",
    ],
  },
  {
    heading:
      "The Science of Urethane Adhesives and Minimum Drive-Away Time (MDAT)",
    body: [
      "The bond between your windshield and the vehicle frame is created by structural urethane adhesive. This adhesive must cure to a specific strength before the vehicle can be driven safely — a window of time known as the Minimum Drive-Away Time. Drive before the MDAT is reached and ordinary road vibration can shift the glass, breaking the seal or, in a crash, allowing the windshield to detach.",
      "Discount shops often use slow, inexpensive adhesives that leave customers waiting hours. We use premium, high-modulus, fast-cure urethane systems engineered for the Texas climate. Depending on temperature and humidity, this allows a safe drive-away in as little as 30 to 60 minutes — and your technician always communicates the exact figure for your job, so you are never guessing.",
    ],
  },
  {
    heading: "Material Quality: Why We Insist on OEE and OEM Glass",
    body: [
      "Not all auto glass is created equal. The cheapest aftermarket glass can carry optical distortion, slightly incorrect curvature, and inferior acoustic and UV layers — flaws that cause eye strain, wind noise, and camera-read errors. We refuse to install it.",
      "Glass Genie uses Original Equipment Manufacturer (OEM) glass or Original Equipment Equivalent (OEE) glass produced by the very same suppliers that build glass for the automakers — names like Pilkington, PGW, and Saint-Gobain Sekurit. The result is a windshield that matches your vehicle's exact thickness, curvature, frit pattern, and sensor compatibility, so it fits perfectly and keeps every safety system reading true.",
    ],
  },
  {
    heading: "The Ultimate Convenience: Our Elite Mobile Service Fleet",
    body: [
      "When your windshield shatters, the last thing you want is to drive an unsafe vehicle across town and wait in a lobby. Our fleet of fully equipped mobile service vehicles brings the complete shop experience to your driveway, office parking lot, or roadside — anywhere in the Dallas–Fort Worth metroplex.",
      "Each mobile unit carries the same professional removal tools, premium adhesives, OEE/OEM glass, and ADAS calibration equipment we would use in a fixed shop. There is no compromise in quality for the convenience — only the elimination of your wasted time.",
    ],
  },
  {
    heading: "Navigating Auto Glass Insurance Claims with Zero Friction",
    body: [
      "Filing an auto glass claim should not require an afternoon on hold. As an approved affiliate of all major insurance networks, Glass Genie handles the entire process for you — verifying your comprehensive coverage, confirming your deductible, and billing your insurer directly.",
      "In Texas, many comprehensive policies cover glass repair and replacement with little or no out-of-pocket cost, and a glass claim typically does not affect your premium the way an at-fault collision would. We will tell you exactly what to expect before any work begins, so there are no surprises.",
    ],
  },
  {
    heading: "The Unmatched Expertise of AGSC Certified Technicians",
    body: [
      "The difference between a safe installation and a dangerous one comes down to the technician. Glass Genie employs only fully vetted, AGSC-certified technicians — never subcontractors paid by the job to rush. Certification through the Auto Glass Safety Council means our team is trained and tested on the Automotive Glass Replacement Safety Standard, the industry's benchmark for safe work.",
      "That expertise shows in the details: a properly primed pinch weld, the correct urethane bead, perfect glass centering, and a verified calibration. It is also why we can confidently back every installation with a Lifetime Warranty against leaks, wind noise, and workmanship defects for as long as you own the vehicle.",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Thorough Inspection & Preparation",
    description:
      "We assess the damage, document the vehicle, and protect the interior and exterior before any work begins.",
  },
  {
    title: "Precision Removal & Preparation",
    description:
      "Old glass is removed without damaging the pinch weld, then the frame is cleaned and primed to factory standards.",
  },
  {
    title: "OEM-Quality Installation",
    description:
      "OEE or OEM glass is set with premium fast-cure urethane for a watertight, structurally sound bond.",
  },
  {
    title: "ADAS Calibration & Final Check",
    description:
      "Cameras and sensors are recalibrated to factory spec and every system is verified before we hand back the keys.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    location: "Dallas, TX",
    rating: 5,
    quote:
      "I was skeptical about a mobile windshield replacement, but Glass Genie came to my office and the whole thing was seamless. The technician explained the calibration step and my lane-assist works perfectly. Couldn't be happier.",
  },
  {
    name: "David Rodriguez",
    location: "Plano, TX",
    rating: 5,
    quote:
      "They handled my insurance claim from start to finish — I didn't have to make a single phone call. Same-day service and zero out of pocket. This is how it should be done.",
  },
  {
    name: "Emily Chen",
    location: "Frisco, TX",
    rating: 5,
    quote:
      "I was worried the chip on my new SUV would spread before I could get it fixed. Glass Genie repaired it in my driveway in under half an hour. You can barely tell it was ever there.",
  },
  {
    name: "Marcus Freeman",
    location: "Arlington, TX",
    rating: 5,
    quote:
      "Professional, on time, and genuinely knowledgeable about the safety side of things. The OEM glass they used is crystal clear and the lifetime warranty gives me real peace of mind.",
  },
];

export const homeFaqs: FAQ[] = [
  {
    question: "How long does a windshield repair or replacement take?",
    answer:
      "A chip repair is usually finished in under 30 minutes. A full replacement takes about 60 to 90 minutes, plus a short adhesive cure time before it's safe to drive. Your technician confirms the exact drive-away time on-site.",
  },
  {
    question: "Will replacing my windshield really come to my location?",
    answer:
      "Yes. Our mobile fleet covers the entire DFW metroplex and carries everything needed — glass, adhesives, and ADAS calibration equipment — to complete the job at your home, office, or roadside.",
  },
  {
    question: "Do you handle insurance claims?",
    answer:
      "We're an approved affiliate of all major insurers and handle the entire claim for you, billing your provider directly. With comprehensive glass coverage, many customers pay nothing out of pocket.",
  },
  {
    question: "Does my windshield camera need to be recalibrated?",
    answer:
      "If your vehicle has a windshield-mounted camera for features like lane-keeping or automatic emergency braking, calibration is required after replacement. We perform static and dynamic calibration on-site and verify the systems before we finish.",
  },
  {
    question: "What does the lifetime warranty cover?",
    answer:
      "Our Lifetime Installation Warranty covers leaks, wind noise, and workmanship defects for as long as you own the vehicle. If anything related to our installation isn't right, we make it right.",
  },
  {
    question: "Is OEE glass as good as OEM?",
    answer:
      "OEE glass is made by the same manufacturers that supply automakers and meets the same specifications for thickness, curvature, and safety. For most vehicles it performs identically to OEM. When OEM is required or requested, we source it.",
  },
];
