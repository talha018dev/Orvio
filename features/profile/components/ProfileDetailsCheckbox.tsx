'use client'

import { COLOR_PRIMARY } from '@/constants/colorConstants'
import { ProfileDetailsType } from '@/features/profile/types/types'
import { Checkbox } from '@mantine/core'
import React from 'react'

const ProfileDetailsCheckbox = ({ profileDetails }: { profileDetails: ProfileDetailsType | undefined }) => {
    return (
        <Checkbox
            label="I agree to receive text messages from reelsync.io for updates and notifications. Message & data rates may apply."
            size="xs"
            color={COLOR_PRIMARY}
            checked={profileDetails?.receiveUpdate === 'true' ? true : false}
            onChange={(e) => {
                console.log(e.currentTarget.checked)
            }}
        />
    )
}

export default ProfileDetailsCheckbox