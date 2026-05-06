/*
  Edit this file to update the site.
  - Change club name, contacts, links, or module text here.
  - app.js renders these objects automatically.
*/

window.siteContent = {
  club: {
    name: "MicroMouse @ OCC",
    school: "Orange Coast College",
    meeting: "Wednesdays 6-8 PM in Lewis Center room 101",
    contact: "occ.micromouse.club@gmail.com, Discord: 1487950618734891020, Instagram: @occ_micromouse",
    deposit: "TBA (Currently no deposit, but we may require one in the future to cover kit costs and encourage care.)"
  },

  program: [
    {
      title: "What is MicroMouse?",
      body: [
        "MicroMouse is an engineering project where students build a small autonomous robot that explores and solves a maze. The robot has to sense walls, drive accurately, remember where it has been, and eventually run the fastest route it can find.",
        "For OCC students, the goal is practical experience with schematics, PCB layout, motors, embedded firmware, sensors, debugging, teamwork, and competition strategy."
      ]
    },
    {
      title: "Training bot first, custom mouse second",
      body: [
        "The year is split into two builds. First, teams assemble and program a beginner robot inspired by UCLA's Rat platform so everyone learns the same core system. Then teams design their own mouse: schematic, bill of materials, PCB, soldering, firmware, tuning, and maze-solving code.",
        "A typical team size is two to three students. OCC can start smaller, with one shared kit per team and weekly work sessions where new members can get help without already knowing embedded systems."
      ]
    },
    {
      title: "Recommended starter kit",
      list: [
        "Training PCB designed by club leads",
        "STM32 Nucleo F411RE development board or equivalent STM32 board",
        "Two LiPo cells plus the correct charger",
        "Two DC motors, motor driver, encoders, wheels, and chassis hardware",
        "IR emitters and receivers for wall sensing",
        "Passive components, JST battery connectors, headers, switches, and soldering supplies"
      ]
    }
  ],

  modules: [
    {
      id: "power",
      title: "Power Module",
      tag: "Batteries + regulator",
      summary: "Choose safe batteries, regulate voltage for the MCU, and draft the first power schematic.",
      sections: [
        {
          heading: "Key ideas",
          bullets: [
            "Lead acid batteries are cheap and easy to charge but too bulky for a mouse.",
            "NiMH cells are common and affordable, but they have lower cell voltage and limited lifespan.",
            "Li-ion cells are energy dense and light, but charging is more complex.",
            "LiPo cells are commonly used for MicroMouse because they are light and can deliver useful current in compact packages."
          ]
        },
        {
          heading: "OCC baseline",
          bullets: [
            "Use two 3.7 V LiPo cells in series when your motor and driver choice needs roughly 6 V or more.",
            "Keep capacity and continuous discharge current in the bill of materials. The UCLA example used 1200 mAh cells with 1 A continuous discharge.",
            "Never discharge a LiPo below 3.0 V per cell; a practical lower limit is about 3.4 V per cell.",
            "Stop using a swollen, soft, punctured, overheated, or damaged battery immediately."
          ]
        },
        {
          heading: "Power schematic checklist",
          bullets: [
            "Battery connectors feed the unregulated supply rail.",
            "A slide switch sits between the battery rail and the rest of the robot.",
            "A 3.3 V regulator powers the microcontroller and logic.",
            "Input and output capacitors sit close to the regulator, based on the regulator datasheet.",
            "Use clear net labels such as VCC, GND, and 3V3, and track every exact part in a BOM."
          ]
        }
      ],
      links: [
        ["UCLA power lecture", "https://youtu.be/UHWE3d_au30?list=PLAWsHzw_h0iiPIaGyXAr44G0XfHfyjOe7"],
        ["SnapEDA", "https://www.snapeda.com/"],
        ["Autodesk education software", "https://www.autodesk.com/education/edu-software/overview"]
      ]
    },
    {
      id: "motors",
      title: "Motors and Encoders",
      tag: "Motion basics",
      summary: "Understand motor types, H-bridges, PWM speed control, and encoder feedback.",
      sections: [
        {
          heading: "Motor choices",
          bullets: [
            "DC motors are simple, inexpensive, and common for beginner MicroMouse robots.",
            "Stepper motors move in controlled increments but can be heavier and less efficient for this scale.",
            "Servo motors include position control, but continuous wheel drive usually favors DC gear motors or specialized drive motors."
          ]
        },
        {
          heading: "How control works",
          bullets: [
            "A microcontroller pin cannot safely power a motor directly, so the robot uses a driver stage.",
            "A transistor can switch a motor on and off; an H-bridge lets the robot reverse motor direction.",
            "PWM changes average motor power by switching quickly between on and off states.",
            "Higher duty cycle generally means more speed, but battery voltage, friction, load, and motor mismatch all matter."
          ]
        },
        {
          heading: "Encoders",
          bullets: [
            "Encoders measure wheel rotation so firmware can estimate speed and distance.",
            "Quadrature encoders provide direction by comparing two offset signal channels.",
            "Encoder counts are the foundation for closed-loop control, straight driving, turns, and distance moves."
          ]
        },
        {
          heading: "Schematic checklist",
          bullets: [
            "Add the H-bridge or motor driver with exact library and footprint.",
            "Route motor output pins to sturdy motor connectors.",
            "Connect direction, sleep/enable, and PWM pins to usable MCU pins.",
            "Add encoder power, ground, and signal lines, then document every pin assignment."
          ]
        }
      ]
    },
    {
      id: "ir-sensors",
      title: "IR Sensors",
      tag: "Wall sensing",
      summary: "Build the emitter and receiver circuits that tell the mouse where maze walls are.",
      sections: [
        {
          heading: "How they work",
          bullets: [
            "An IR emitter shines infrared light outward from the robot.",
            "A receiver detects reflected IR light from nearby walls.",
            "The analog reading depends on wall distance, wall material, sensor angle, ambient light, and calibration.",
            "Most mice use front and side sensors so the robot can center itself and detect openings."
          ]
        },
        {
          heading: "Emitter circuit",
          bullets: [
            "Use a current-limiting resistor so the IR LED does not draw too much current.",
            "A transistor can switch the emitter from an MCU pin without forcing the pin to supply all LED current.",
            "Pulsing emitters and subtracting ambient readings can make measurements more reliable."
          ]
        },
        {
          heading: "Receiver circuit",
          bullets: [
            "The phototransistor or photodiode converts reflected light into an electrical signal.",
            "A resistor turns that light-dependent current into a voltage the ADC can read.",
            "Sensor placement and angle are as important as the schematic; leave room to test positions."
          ]
        }
      ]
    },
    {
      id: "microcontroller",
      title: "Microcontroller Module",
      tag: "MCU + pins",
      summary: "Plan the STM32 connections that coordinate motors, sensors, encoders, and debug tools.",
      sections: [
        {
          heading: "Microcontroller role",
          bullets: [
            "The MCU reads sensors, counts encoder pulses, controls motor drivers, runs PID loops, stores maze state, and chooses the next move.",
            "The STM32 Nucleo F411RE is a friendly training board because it exposes pins, has USB programming, and works with STM32CubeIDE."
          ]
        },
        {
          heading: "Schematic planning",
          bullets: [
            "Reserve ADC-capable pins for IR receivers.",
            "Reserve timer-capable pins for PWM motor outputs.",
            "Reserve interrupt or timer encoder inputs for quadrature encoder channels.",
            "Expose SWD/programming pins, ground, and power rails for debugging.",
            "Maintain a pin table so schematic, PCB, and firmware stay aligned."
          ]
        }
      ]
    },
    {
      id: "stm32",
      title: "STM32CubeIDE Setup",
      tag: "Firmware start",
      summary: "Install CubeIDE, create a project, configure pins, generate drivers, and flash code.",
      sections: [
        {
          heading: "Workflow",
          bullets: [
            "Install STM32CubeIDE from STMicroelectronics and create a project for the exact MCU or Nucleo board.",
            "Use the pinout view to set GPIO, ADC, timers, PWM channels, UART, and encoder inputs.",
            "Generate initialization code, then write firmware inside the user code blocks so regeneration does not overwrite your work.",
            "Build, connect the board by USB or ST-Link, upload, and verify behavior with LEDs, serial output, or a debugger."
          ]
        },
        {
          heading: "First firmware goals",
          bullets: [
            "Blink an LED to confirm upload works.",
            "Read a button or sensor value.",
            "Start PWM on a timer channel.",
            "Print debug values or inspect them with the debugger.",
            "Commit working project templates before adding complex robot logic."
          ]
        }
      ]
    },
    {
      id: "pid",
      title: "Motor Setup and PID",
      tag: "Control loops",
      summary: "Install motors, read encoders, configure PWM, and tune closed-loop driving.",
      sections: [
        {
          heading: "Hardware setup",
          bullets: [
            "Solder the H-bridge or motor driver carefully and inspect every bridge pin for shorts.",
            "Install motor JST cables or connectors with consistent left/right polarity.",
            "Secure motors so wheel alignment and chassis flex do not ruin tuning."
          ]
        },
        {
          heading: "Encoder and motor code",
          bullets: [
            "Configure timers or interrupts for encoder signals.",
            "Convert encoder counts into wheel speed and distance.",
            "Configure PWM outputs and direction pins for each motor.",
            "Test each motor independently before enabling closed-loop control."
          ]
        },
        {
          heading: "PID progression",
          bullets: [
            "A proportional term reacts to present error, integral reacts to accumulated error, and derivative reacts to error change.",
            "Start with straight-line speed matching between left and right wheels.",
            "Then add segmented moves: turn a fixed angle, move one maze cell, stop, and repeat.",
            "Optional acceleration profiles reduce slipping and make movement smoother."
          ]
        }
      ]
    },
    {
      id: "ir-code",
      title: "IR Code",
      tag: "Sensor firmware",
      summary: "Read calibrated IR values and use wall information to drive through a simple maze.",
      sections: [
        {
          heading: "Hardware assumptions",
          bullets: [
            "Each receiver signal should land on an ADC-capable MCU pin.",
            "Emitters can be controlled by GPIO pins or grouped by transistor switches.",
            "Name sensors by position, such as left, right, front-left, and front-right, so code reads naturally."
          ]
        },
        {
          heading: "Software steps",
          bullets: [
            "Configure ADC channels in CubeIDE.",
            "Take ambient readings, turn emitters on, take lit readings, and subtract when possible.",
            "Calibrate thresholds for wall present, centered, too close, and too far.",
            "Begin with simple navigation rules before adding full maze solving."
          ]
        },
        {
          heading: "Maze navigation starter",
          bullets: [
            "Use side sensors to stay centered in a corridor.",
            "Use front sensors to decide when to stop before a wall.",
            "Implement a basic right-hand, left-hand, or dead-reckoning routine for the training maze.",
            "Log sensor values while driving because most bugs are calibration bugs in disguise."
          ]
        }
      ]
    },
    {
      id: "floodfill",
      title: "Floodfill Module",
      tag: "Maze solving",
      summary: "Represent the maze, update wall data, flood distances, and choose a route to the goal.",
      sections: [
        {
          heading: "Concept",
          bullets: [
            "Floodfill assigns each cell a distance value based on how many moves it is from the goal.",
            "The mouse repeatedly moves to a neighboring cell with a lower value.",
            "When new walls are discovered, the maze map and distance values are updated.",
            "The algorithm can first explore safely, then run a faster path after enough maze data is known."
          ]
        },
        {
          heading: "Implementation pieces",
          bullets: [
            "Store walls for north, east, south, and west for each maze cell.",
            "Track the mouse position and heading.",
            "Use a queue to recompute affected cell distances when walls change.",
            "Write movement decisions separately from low-level motor control so the solver stays testable."
          ]
        },
        {
          heading: "Simulator path",
          bullets: [
            "Use a simulator such as mms to test maze logic before risking hardware.",
            "Make tiny test mazes first, then standard 16 by 16 mazes.",
            "Print cell values and wall states while debugging."
          ]
        }
      ],
      links: [
        ["mms simulator releases", "https://github.com/mackorone/mms/releases/tag/v1.1.0"],
        ["Mac simulator guide", "https://docs.google.com/presentation/d/18rHwcIJNPsIRkun7N9Wq5YYAiFSc-rkyNcAQBOEolg4/edit?usp=sharing"],
        ["Windows simulator guide", "https://docs.google.com/presentation/d/1tr_2cUcouLl3fvlSyOth7XXo3jRbpBw1TfRX8yWRETY/edit?usp=sharing"]
      ]
    },
    {
      id: "qa",
      title: "Q&A",
      tag: "Common questions",
      summary: "Practical answers for technical, competition, program, and budget decisions.",
      sections: [
        {
          heading: "Technical",
          bullets: [
            "Beginners can join without previous PCB or embedded experience if the club keeps weekly milestones and office-hour-style work sessions.",
            "A working training robot matters more than an elegant first design; use it to learn what your custom mouse should improve.",
            "Keep pin tables, BOMs, schematics, and firmware notes in shared folders so future OCC teams inherit the work."
          ]
        },
        {
          heading: "Competition",
          bullets: [
            "A simple end-of-semester maze is useful even before teams are ready for a full 16 by 16 competition.",
            "The All American MicroMouse Competition is a yearly intercollegiate event that OCC teams can use as a stretch goal.",
            "Teams that are not ready to compete can still attend events to learn from other schools."
          ]
        },
        {
          heading: "Budget",
          bullets: [
            "The largest costs are boards, motors, batteries, sensors, drivers, wheels, hardware, spare parts, and maze materials.",
            "Deposits can help protect kits, but OCC leadership should decide a policy that fits campus rules.",
            "Reuse training kits and maintain a shared inventory to lower the cost for future cohorts."
          ]
        }
      ]
    },
    {
      id: "aamc",
      title: "AAMC",
      tag: "Intercollegiate goal",
      summary: "Use the All American MicroMouse Competition as the long-term target for OCC teams.",
      sections: [
        {
          heading: "What it is",
          bullets: [
            "AAMC is an intercollegiate MicroMouse competition, historically hosted at UCLA in May.",
            "Teams run mice in a full 16 by 16 maze and compare performance with students from other schools.",
            "Even before OCC is competition-ready, attending is valuable for seeing designs, meeting leads, and learning what successful teams prioritize."
          ]
        },
        {
          heading: "How OCC can prepare",
          bullets: [
            "Run a local showcase first with a smaller maze and clear safety checks.",
            "Bring spare batteries, chargers, soldering tools, laptops, firmware backups, and printed pin/BOM notes.",
            "Design the spring schedule around soldering, bring-up, PID tuning, floodfill testing, and final repairs."
          ]
        }
      ]
    }
  ],

  schedule: [
    {
      term: "Fall: fundamentals and training robot",
      weeks: [
        ["Week 1-2", "Club launch, safety, kit overview, team formation, and tool setup."],
        ["Week 3", "Project overview, microcontrollers, batteries, basic Nucleo code, and power schematic."],
        ["Week 4", "Motors, encoders, H-bridge schematic, and first motor-control assignment."],
        ["Week 5-6", "Motor bring-up, PID introduction, and power plus H-bridge PCB practice."],
        ["Week 7-8", "IR sensing, wall following, PID refinement, and IR schematic."],
        ["Week 9-10", "Training robot competition and rough custom mouse schematic/BOM kickoff."]
      ]
    },
    {
      term: "Winter: custom schematic, PCB, and solver",
      weeks: [
        ["Week 1-2", "Schematic design reviews and rough custom mouse BOM due."],
        ["Week 3", "PCB design lecture, final schematic review, and PCB rough draft assignment."],
        ["Week 4-6", "PCB reviews, final board files, parts ordering, and manufacturing decisions."],
        ["Week 7-10", "Floodfill lecture, simulator testing, maze data structures, and solver assignment."]
      ]
    },
    {
      term: "Spring: assembly, tuning, showcase",
      weeks: [
        ["Week 1-4", "PCB arrival, soldering, electrical bring-up, and smoke tests."],
        ["Week 5-6", "Motor tuning, IR calibration, and movement primitives."],
        ["Week 7-8", "Floodfill on hardware, reliability work sessions, and local maze practice."],
        ["Week 9-10", "OCC showcase, final repairs, and optional AAMC travel or attendance."]
      ]
    }
  ],

  events: [
    {
      title: "OCC fall training race",
      body: "A low-pressure race for the training bots. Use a simple maze so students can finish with dead reckoning, wall following, or early sensor logic."
    },
    {
      title: "OCC spring showcase",
      body: "Invite students, faculty, and partner clubs to watch custom mice run. Include design posters or quick demos for teams that are still debugging."
    },
    {
      title: "AAMC",
      body: "Treat the All American MicroMouse Competition as the stretch target. OCC students can compete when ready or attend to learn from established teams."
    }
  ],

  logistics: [
    {
      title: "Team tracking",
      body: "Keep a spreadsheet with team members, kit number, schematic status, PCB status, ordered parts, firmware milestone, and current blocker."
    },
    {
      title: "Communication",
      body: "Use one official channel for announcements and one team channel per build group. Discord, mailing lists, Canvas, or Google Classroom can all work."
    },
    {
      title: "Work sessions",
      body: "Schedule more work sessions near schematic review, PCB order, soldering, and competition deadlines. Debugging is much easier when hardware, firmware, and mentor help are in the same room."
    },
    {
      title: "Shared resources",
      body: "Maintain a shared drive for syllabus, CAD files, code templates, lecture slides, BOMs, maze files, and postmortems from each cohort."
    }
  ],

  join: [
    {
      title: "Quick edits",
      body: [
        "Open content.js and update the club object near the top with your real meeting time, room, contact links, and kit/deposit policy.",
        "Each curriculum card is in the modules array. Edit summaries, bullets, and links there; the page updates automatically."
      ]
    },
    {
      title: "Recommended next OCC-specific additions",
      list: [
        "Add names and emails for OCC student leads and faculty advisor.",
        "Add photos of your first kit, maze, lab space, or PCB once available.",
        "Replace generic schedule dates with OCC semester dates.",
        "Add links to your Discord, Instagram, Canvas, Google Drive, GitHub, and sign-up form."
      ]
    }
  ]
};
