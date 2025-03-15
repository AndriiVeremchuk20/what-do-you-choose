"use client"

import { useEffect, useRef } from "react";
import AppSounds from "~/config/sounds";
import { useAppStore } from "~/store";

const Sound = () => {
	const ref = useRef<HTMLAudioElement | null>(null);
	const { playMusic } = useAppStore();

	useEffect(() => {
		const handlePlayback = async () => {
			if (!ref.current) return;

			if (playMusic) {
				try {
					await ref.current.play();
				} catch (error) {
					console.error("Playing error", error);
				}
			} else {
				ref.current.pause();
			}
		};

			handlePlayback().then().catch(e=>console.log(e));
	}, [playMusic]);

	return (
		<audio ref={ref}>
			<source src={AppSounds[0]!.link} type="audio/mpeg" />
		</audio>
	);
};

export default Sound;

