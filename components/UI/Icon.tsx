'use client'

import { COLOR_PRIMARY_TEXT } from '@/constants/colorConstants'
import { ArrowCounterClockwise, ArrowRight, ArrowsOutSimple, ArrowUpRight, BuildingOffice, Calendar, CalendarDots, CaretDown, CaretLeft, CaretRight, ChartPieSlice, Check, Circle, CurrencyCircleDollar, DotsSixVertical, Download, Faders, Folder, FolderOpen, GlobeSimple, Link, List, ListChecks, MagnifyingGlass, PaperPlaneTilt, PencilSimpleLine, Plus, Question, Rows, RowsPlusBottom, SignOut, SpinnerGap, StackPlus, TextOutdent, Trash, Upload, User, UserList, Users, UsersThree, Warning, WarningCircle, X } from '@phosphor-icons/react'
import React from 'react'

export type IconNameProps = 'Circle' | 'ArrowsOutSimple' | 'BuildingOffice' | 'ArrowRight' | 'ArrowCounterClockwise' | 'Upload' | 'Question' | 'SignOut' | 'User' | 'GlobeSimple' | 'ListChecks' | 'Link' | 'CaretLeft' | 'CaretRight' | 'CaretDown' | 'ArrowUpRight' | 'Folder' | 'DotsSixVertical' | 'Faders' | 'Trash' | 'Download' | 'WarningCircle' | 'PencilSimpleLine' | 'FolderOpen' | 'CalendarDots' | 'X' | 'MagnifyingGlass' | 'Calendar' | 'CurrencyCircleDollar' | 'Warning' | 'Check' | 'Plus' | 'RowsPlusBottom' | 'UserList' | 'UsersThree' | 'ChartPieSlice' | 'Users' | 'StackPlus' | 'Rows' | 'List' | 'TextOutdent' | 'PaperPlaneTilt' | 'Loader' | ''
export type IconWeightProps = 'thin' | 'light' | 'regular' | 'fill' | 'duotone' | 'bold'

type PropTypes = React.HTMLAttributes<HTMLDivElement> & {
    name: IconNameProps,
    fontSize?: number,
    color: string,
    hoverColor?: string,
    className?: string,
    weight?: IconWeightProps
}

const iconMap: { [key: string]: React.ReactElement } = {
    Circle: <Circle />,
    ArrowsOutSimple: <ArrowsOutSimple />,
    BuildingOffice: <BuildingOffice />,
    ArrowCounterClockwise: <ArrowCounterClockwise />,
    Upload: <Upload />,
    Question: <Question />,
    SignOut: <SignOut />,
    User: <User />,
    GlobeSimple: <GlobeSimple />,
    ListChecks: <ListChecks />,
    Link: <Link />,
    CaretLeft: <CaretLeft />,
    CaretRight: <CaretRight />,
    CaretDown: <CaretDown />,
    ArrowUpRight: <ArrowUpRight />,
    ArrowRight: <ArrowRight />,
    Folder: <Folder />,
    DotsSixVertical: <DotsSixVertical />,
    Faders: <Faders />,
    Trash: <Trash />,
    Download: <Download />,
    WarningCircle: <WarningCircle />,
    PencilSimpleLine: <PencilSimpleLine />,
    FolderOpen: <FolderOpen />,
    CalendarDots: <CalendarDots />,
    X: <X />,
    MagnifyingGlass: <MagnifyingGlass />,
    Calendar: <Calendar />,
    CurrencyCircleDollar: <CurrencyCircleDollar />,
    Warning: <Warning />,
    Check: <Check />,
    Plus: <Plus />,
    RowsPlusBottom: <RowsPlusBottom />,
    UserList: <UserList />,
    UsersThree: <UsersThree />,
    ChartPieSlice: <ChartPieSlice />,
    Users: <Users />,
    StackPlus: <StackPlus />,
    Rows: <Rows />,
    List: <List />,
    TextOutdent: <TextOutdent />,
    Loader: <SpinnerGap />,
    PaperPlaneTilt: <PaperPlaneTilt />,
}

const Icon = ({ name, fontSize, color = 'transparent', hoverColor, className, weight, ...rest }: PropTypes) => {
    const defaultIconSize = 18
    const selectedIcon = iconMap[name]

    if (selectedIcon) {
        return React.cloneElement(selectedIcon, {
            //@ts-expect-error overload mismatch
            size: fontSize ?? defaultIconSize,
            color: className?.includes('hover') ? hoverColor : color ? color : COLOR_PRIMARY_TEXT,
            className: className ?? '',
            weight: weight ?? 'bold',
            ...rest
        })
    }

    return null
}

export default Icon
