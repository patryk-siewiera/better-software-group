import React from "react";

export default function Playlist() {
	return (
		<div
			style={{
				display: "flex",
				// maxHeight: "100%",
				overflow: "auto",
			}}
		>
			<div
				style={{
					maxHeight: "300px",
					minHeight: "200px",
					// backgroundColor: "crimson",
					overflow: "auto",
				}}
			>
				<ol>
					{[/*api.getMediaList() ||*/ ...Array(15)].map((e) => (
						<li>
							<div>
								<img src="" alt="cover 19:6" />
								<span>title</span>
							</div>
						</li>
					))}
				</ol>
			</div>
			{1 && (
				<div
					style={{
						minHeight: "200px",
						maxHeight: "300px",
						minWidth: "250px",
						overflow: "auto",
					}}
				>
					<ol>
						{[...Array(15)].map((e) => (
							<li>track name, length in min:sec</li>
						))}
					</ol>
				</div>
			)}
		</div>
	);
}
