import React from 'react';

import { Text } from '@chakra-ui/react'

import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react'


export default function Stats({ data }) {
    return (
        <StatGroup marginLeft={3} marginRight={3}>
            <Stat>
                <StatLabel><small>Counter</small></StatLabel>
                <StatHelpText>
                    <StatArrow type='increase' />
                    {data?.count || 99}
                </StatHelpText>
            </Stat>
            <Stat>
                <StatLabel><small>Delays</small></StatLabel>
                <StatHelpText>
                    <StatArrow type='decrease' />
                    {data?.delay || 3}
                </StatHelpText>
            </Stat>

            <Stat>
                <StatLabel><small>Avg time</small></StatLabel>
                <StatHelpText>
                    <StatArrow type='decrease' />
                    {"45min"}
                </StatHelpText>
            </Stat>
        </StatGroup>
    );
}
