import React, { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

const Examination = () => {
	const [age, setAge] = useState("");

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<>
			<div style={{ height: "500px" }}>
				<div
					style={{
						fontWeight: "bold",
						textAlign: "left",
						fontSize: "1.5em",
						paddingTop: "5em",
					}}
				>
					Examination
				</div>
				<div>Starry day! &#128512;</div>
				<div style={{ paddingTop: "1rem" }}>
					Welcome to 7-Star Manpower Services of the Philippines Corporation!
					Today, you are fews steps away from being hired and be part of the
					company by allowing you to take our Online Pre-Employment
					Examinations. Before starting your online pre-employment examination,
					please make sure that you are well-prepared and guided with each
					steps.
				</div>
				<div>
					<ol>
						<li>Pray and ask for guidance of the Lord.</li>
						<li>
							Internet connection should be in good and stable condition. Slow
							internet connection may affect the result of your examination.
						</li>
						<li>
							Click the URL link that will be sent to you. Once clicked, you are
							automatically directed to start. Avoid, opening other applications
							or windows while taking the examination. This will disrupt and
							limit the possibility of recording your anser, hence, may affect
							the result of your examination.
						</li>
						<li>
							Read and understand the test guidelines and directions. For any
							concerns noted, please do not hesitate to contact the Recruitment
							Head-in-charge.
						</li>
						<li>
							Once you passed the examination, the Recruitment Head-in-charge
							will contact you for the initial interview. Thank you. Good luck!
						</li>
					</ol>
				</div>
				<div>
					<Grid container spacing={3}>
						<Grid item xs={2}>
							<div
								style={{
									fontWeight: "bold",
									textAlign: "left",
									fontSize: "1.5em",
									paddingTop: "1.2rem",
								}}
							>
								Applying For
							</div>
						</Grid>
						<Grid item xs={6}>
							<FormControl sx={{ m: 1, minWidth: 120 }}>
								<Select onChange={handleChange} displayEmpty>
									<MenuItem value="">
										<em>Select Job</em>
									</MenuItem>
									<MenuItem value={10}>Service Crew</MenuItem>
									<MenuItem value={20}>Managerial</MenuItem>
									<MenuItem value={30}>Administrative</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</div>
			</div>
		</>
	);
};

export default Examination;
