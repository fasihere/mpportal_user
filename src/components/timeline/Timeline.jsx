import "./timeline.scss";
import React, { useEffect, useState } from "react";
import { Chrono } from "react-chrono";
import { SettingsRemoteRounded } from "@material-ui/icons";

export default function Timeline() {
  const items = [
    {
      title: "1996- 1998",
      cardSubtitle:
        "Dean joined KSU, the student wing of the Indian National Congress, and was chosen as the Unit secretary at New Man College Thodupuzha",
    },
    {
      title: "1999- 2000",
      cardSubtitle:
        "Dean was elected as the KSU unit president at St.Joseph's college Molamattom and held position",
    },
    {
      title: "2000",
      cardSubtitle:
        "Dean was elected as the University Union Councilor at St.Joseph's college Molamattom",
    },
    {
      title: "2001",
      cardSubtitle:
        "Elected as the Student’s Council Member at the Mahatma Gandhi University, Kottayam.",
    },
    {
      title: "2004",
      cardSubtitle: "Dean was elected as the KSU State General Secretary",
    },
    {
      title: "2007",
      cardSubtitle:
        "Elected as the KSU State Vice President and held the position until 2009.",
    },
    {
      title: "2009",
      cardSubtitle:
        "Dean was elected as the Kerala State Secretary for Indian Youth Congress",
    },
    {
      title: "2010",
      cardSubtitle:
        "Dean was elected by Indian Youth Congress as the Lok Sabha President, Idukki, and this position was held until May 2013.",
    },
    {
      title: "2013",
      cardSubtitle:
        "Dean was elected as the Kerala state president of Indian Youth Congress, and held the position until March 2020.",
    },
    {
      title: "2013",
      cardSubtitle:
        "The 'Padayatra' started from kumbla in kasargod on 10th Dec 2013 and completed at Putharikandam ground in Thiruvananthapuram on 22nd January 2014.",
    },
    {
      title: "2014",
      cardSubtitle:
        "Growth in Dean's political career was inseparable by his virtuous deeds. Accounting his sincerity, trustworthiness and tireless serving attitude, Indian National Congress nominated Dean Kuriakose as the candidate representing Idukki constituency for the 2014 Lok Sabha elections. Prevailing political winds across the nation left Dean to the second position in 2014 Lok Sabha election results of Idukki constituency.",
    },
    {
      title: "2015",
      cardSubtitle:
        "Dean conducted the Youth Congress State Conference at Kozhikode from 22nd - 27th May. The conference included various seminars, workshops, Alumni meet and representative meetings and forums. The Youth Congress State Conference was inaugurated by Rahul Gandhi and had a participation of more than 100,000 people from various parts of Kerala and other states.",
    },
    {
      title: "2016",
      cardSubtitle:
        "Dean observed 'sathyagraham' for a period of 8 days at the Secretariat of Kerala, Thiruvananthapuram in 2016, asking the state government to take appropriate actions against the self financing college capitation fees.",
    },
    {
      title: "2016",
      cardSubtitle:
        "Followed by the Youth Congress State Conference in 2015, Dean conducted a Secular Youth congregation on 15th Aug 2016 at Ernakulam, emphasizing the importance of being secular, and recalled the messages and principles Mahatma Gandhi.Various seminars were conducted in this front.",
    },
    {
      title: "2017",
      cardSubtitle:
        "Dean led Youth March from Manjeswaram to Thiruvananthapuram, with the vision of awakening the youths of kerala against rationalism and communalism, frailty performance of the ruling government. The Youth March led by Dean was joined by various Youth Fronts of UDF on the closing day - 25th May 2018, and together they besieged the secretariat of kerala at Thiruvananthapuram. Youth March led by Dean was inaugurated by Indian Youth Congress President Amarinder Singh Raja Brar.",
    },
    {
      title: "2018",
      cardSubtitle:
        "Dean observed his second 'Sathyagraham' in 2018 for 8 days at the Secretariat of Kerala, Thiruvananthapuram, seeking justice and adequate probe on Sohaib murder case.",
    },
    {
      title: "2019",
      cardSubtitle:
        "Lok Sabha elections, his tireless efforts won him the Idukki Lok Sabha constituency with a lead margin of 1,71,053 defeating Joice George of LDF, and is currently the MP of Idukki Lok Sabha constituency.",
    },
    {
      title: "2020",
      cardSubtitle:
        "Dean has initiated an charitable trust called as IDUKKI CARE FOUNDATION to execute his vision for the betterment of Idukki district.",
    },
  ];
  const [width, setWidth] = useState(window.innerWidth);
  const [menu, setMenu] = useState("");

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  });

  useEffect(() => {
    if (width <= 600) {
      setMenu("VERTICAL");
    } else {
      setMenu("VERTICAL_ALTERNATING");
    }
  }, [width]);

  return (
    <div className="timeline">
      <div className="chrono">
        <Chrono items={items} slideShow mode={menu} />
      </div>
    </div>
  );
}
