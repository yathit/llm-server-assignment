'use client'

import {Button, Loader, Slider} from "@mantine/core";
import React, {useCallback, useState} from "react";
import {useGetUserProfileQuery, usePostLlmProfileMutation} from "@/lib/features/chat";
import {UserProfile} from "@/lib/types";

export default function LlmPropertyPanel() {
    const {data: userProfile} = useGetUserProfileQuery();
    if (!userProfile) {
        return <Loader>Loading LLM settings...</Loader>
    }
    return (
        <LlmProperty userProfile={userProfile}/>
    )
}

function LlmProperty({userProfile}: { userProfile: UserProfile }) {


    const [postProfile, {isLoading}] = usePostLlmProfileMutation();
    const [temperature, setTemperature] = useState(userProfile.llm_config?.temperature ?? 1.0);
    const onTemperatureUpdated = useCallback((value: number) => {
        setTemperature(value);
    }, [setTemperature]);
    const onSave = useCallback(() => {
        postProfile({temperature});
    }, [postProfile, temperature]);
    return (
        <div>
            <h5><span>LLM Properties</span> <Button
                size={"compact-sm"}
                style={{float: "right"}}
                disabled={isLoading}
                onClick={onSave}
            >Save</Button></h5>
            <div>
                <label>{`Temperature: ${temperature}`}</label>
                <Slider
                    max={2.0}
                    step={0.01}
                    min={0.0}
                    label={null}
                    value={temperature}
                    onChange={onTemperatureUpdated}
                    size={2}
                />
            </div>

        </div>
    )
}