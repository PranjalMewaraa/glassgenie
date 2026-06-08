import type { Service } from "@/content/types";

export const adasCalibration: Service = {
  slug: "adas-calibration",
  name: "ADAS Calibration",
  subtitle:
    "Precise recalibration of cameras and sensors after any windshield service.",
  metaDescription:
    "On-site ADAS calibration across Dallas–Fort Worth after windshield replacement. Static and dynamic recalibration to factory spec by AGSC-certified technicians.",
  cardSummary:
    "Modern safety systems depend on a perfectly aimed camera. We calibrate to factory spec, on-site.",
  sections: [
    {
      heading: "What ADAS Is and Which Features Depend on Your Windshield Camera",
      body: [
        "Advanced Driver Assistance Systems, or ADAS, are the suite of automated safety features that watch the road on your behalf and intervene when something goes wrong. The heart of most of these systems is a forward-facing camera mounted at the top of your windshield, just behind the rearview mirror, that reads lane lines, vehicles, pedestrians, and signs dozens of times per second. That single camera feeds a remarkable amount of safety technology.",
        "Lane departure warning and lane-keeping assist rely on it to track the painted lines and nudge you back into your lane. Automatic emergency braking uses it to detect a stopped car or pedestrian and slam on the brakes when you cannot react in time. Adaptive cruise control reads the distance to the vehicle ahead, and traffic sign recognition reports the current speed limit to your dash. Every one of these features is only as accurate as the aim of the camera looking through your glass — which is exactly why the camera and the windshield are inseparable.",
      ],
    },
    {
      heading: "Why Every Windshield Replacement Requires Recalibration",
      body: [
        "When a windshield is removed and replaced, the camera that reads the road is unbolted and reinstalled, and the new glass itself can sit at a fractionally different angle or have slightly different optical properties than the original. Even a perfect installation disturbs the precise geometry the camera was originally aimed to. The system has no way of knowing the world shifted around it — it simply trusts that its aim is still correct.",
        "The problem is that small errors at the camera become enormous errors down the road. A misalignment of just one degree at the windshield translates into the camera looking several feet off-target at the distance where automatic emergency braking actually needs to make a decision. That can mean the system fails to see a stopped vehicle, brakes for an obstacle that is in the next lane, or steers toward the wrong line. This is why recalibration is mandatory after any windshield removal and replacement, regardless of make, model, or how clean the installation looked.",
      ],
    },
    {
      heading: "Static vs. Dynamic Calibration Explained",
      body: [
        "There are two distinct methods of recalibrating an ADAS camera, and the correct one depends entirely on what the vehicle manufacturer specifies. Static calibration is performed while the vehicle is stationary in a controlled environment. The technician positions precisely measured targets and calibration boards at exact distances and heights in front of the vehicle, then uses a factory-grade scan tool to teach the camera where those reference points sit so it can re-establish its aim.",
        "Dynamic calibration, by contrast, is performed on the road. The technician connects the scan tool and drives the vehicle at a manufacturer-specified speed under suitable conditions while the system recalibrates itself by observing real lane markings and traffic. Many modern vehicles do not accept one method or the other — they require both, a procedure known as dual calibration, in which the static targets establish a baseline and the dynamic drive confirms and finalizes it. Glass Genie identifies the exact procedure your specific vehicle demands and completes whichever combination the manufacturer requires.",
      ],
    },
    {
      heading: "The Real Risk of Skipping Calibration",
      body: [
        "Driving away from a windshield replacement without recalibrating the ADAS is a genuine safety gamble, not a minor technicality. An uncalibrated system can behave in three dangerous ways: it can throw false warnings and phantom braking that startle the driver, it can fail silently to react when it actually matters, or it can disable itself entirely and leave you without the protection you are counting on. None of these outcomes is acceptable on a DFW freeway at 70 miles per hour.",
        "There is also a serious liability dimension. If your vehicle is involved in a collision after a windshield service and the safety systems were never recalibrated to factory spec, responsibility for that oversight can land on whoever performed the glass work — or on the driver. A reputable shop treats calibration as a non-negotiable part of the job. Glass Genie documents every calibration we perform so you have a clear record that your vehicle was returned to its manufacturer's safety specifications.",
      ],
    },
    {
      heading: "On-Site Calibration as Part of the Job, Not a Separate Trip",
      body: [
        "Many auto glass shops replace your windshield and then hand you a referral, sending you to a dealership across town and on a different day to have the calibration done. That means a second appointment, more time off work, and often a separate bill. Glass Genie removes that hassle entirely by performing ADAS calibration on-site as an integrated part of the same service.",
        "Our AGSC-certified technicians arrive with the factory-grade scan tools and the precision targets and calibration boards required to complete a proper static, dynamic, or dual calibration wherever you are in the Dallas–Fort Worth metroplex. Doing the glass replacement and the recalibration together also guarantees the two steps are matched — the camera is aimed to the exact glass it will be looking through. You leave with a vehicle whose safety systems are fully restored, all in a single visit, and backed by our lifetime workmanship warranty.",
      ],
    },
  ],
  keyBenefits: [
    { label: "Static & Dynamic Calibration" },
    { label: "Factory-Grade Scan Tools" },
    { label: "Done On-Site in One Visit" },
    { label: "AGSC-Certified Technicians" },
  ],
  faqs: [
    {
      question: "Why do I need ADAS calibration after a windshield replacement?",
      answer:
        "Your forward-facing safety camera is mounted to the windshield, so replacing the glass disturbs its precise aim. Even a one-degree misalignment can put the camera several feet off-target down the road, which can cause emergency braking, lane-keeping, and adaptive cruise to malfunction. Recalibration restores factory accuracy.",
    },
    {
      question: "What's the difference between static and dynamic calibration?",
      answer:
        "Static calibration uses precisely placed targets and boards while the vehicle is parked, while dynamic calibration is done by driving at a set speed so the system can re-learn from real lane lines. Many vehicles require both, known as dual calibration. We perform whichever your manufacturer specifies.",
    },
    {
      question: "Can you calibrate my car on-site, or do I have to go to the dealer?",
      answer:
        "We calibrate on-site as part of the same appointment. Our technicians bring the factory-grade scan tools and calibration targets needed to finish the job wherever you are in DFW, so you don't need a separate trip to the dealership on another day.",
    },
    {
      question: "What happens if I skip calibration?",
      answer:
        "An uncalibrated system can throw false warnings, brake unexpectedly, fail to react when it should, or shut itself off. There's also a liability risk if a crash occurs with safety systems that were never restored to factory spec. We treat calibration as a required, non-negotiable part of any windshield service.",
    },
    {
      question: "How do I know if my vehicle even has ADAS?",
      answer:
        "If your car offers lane departure warning, lane-keeping assist, automatic emergency braking, adaptive cruise control, or traffic sign recognition, it almost certainly relies on a windshield-mounted camera. We confirm your exact configuration during the inspection and only calibrate the systems your vehicle actually has.",
    },
  ],
  layout: "zigzag",
  complete: true,
};
