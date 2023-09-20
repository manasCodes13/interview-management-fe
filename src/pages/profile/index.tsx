import { toast } from "react-toastify";
import React, { useEffect, useState } from 'react'
import { useAtom } from "jotai";
import { accessTokenStore, userDetail, reloaduserDetails, breadcrumbStore } from "@/store/global";
import { Button, DatePicker, DatePickerProps, Input, Select, Skeleton } from "antd";
import { updateuser } from "@/methods/common/common";
import { produce } from 'immer';
import dayjs from "dayjs";




const Profile = () => {
    const [user] = useAtom(userDetail)
    const [accessTkn] = useAtom(accessTokenStore)
    const [_, setReload] = useAtom(reloaduserDetails)
    const [breadcrumb, setBreadcrumb] = useAtom(breadcrumbStore)

    const [loading, setLoading] = useState(true)

    const [dataNow, setdataNow] = useState({
        name: "",
        displayName: "",
        email: user?.email,
        dob: "",
        jobTitle: "",
        organization: "",
        address: ""
    })

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        updateDataNow("dob", dateString)
    };

    const updateDataNow = (key: string, value: string) => {
        setdataNow(produce((state: any) => {
            state[key] = value
        }))
    }


    const userUpdateFunc = async () => {
        const userUpdateAPIFunCall = await updateuser({ accessToken: accessTkn, email: user?.email, data: dataNow });

        if (userUpdateAPIFunCall?.success) {
            toast(`${userUpdateAPIFunCall?.message}`, { autoClose: 2000, type: 'success' })
            setReload(true)
        }
        else {
            toast(`${userUpdateAPIFunCall?.message}`, { autoClose: 2000, type: 'error' })
        }
    };


    useEffect(() => {
        if (user) {
            setdataNow({
                name: user?.name,
                displayName: user?.displayName,
                email: user?.email,
                dob: user?.dob,
                jobTitle: user?.jobTitle,
                organization: user?.organization,
                address: user?.address
            })
        }
        setLoading(false)
    }, [user])


    useEffect(() => {
        setBreadcrumb(["Profile"])
    }, [])



    return (
        <div className='w-full h-full flex justify-center pt-20 overflow-scroll'>
            {loading ?
                <Skeleton active />
                :
                <div className="w-1/2">
                    <div className='w-full'>
                        <div className='w-36 h-36 rounded-full bg-red-400 flex justify-center items-center text-7xl text-white'>{user?.email?.split("")?.[0]}</div>
                    </div>
                    <br />
                    <br />
                    <div className="w-full flex justify-end">
                        {/* <Button className="w-24 h-10 text-white font-normal text-base">Clear</Button> */}
                        <Button className="w-24 h-10 text-white font-normal text-base" onClick={userUpdateFunc}>Submit</Button>

                    </div>
                    <span className="text-xl uppercase font-semibold">About You</span>
                    <div className="p-10 shadow-lg mt-5 flex flex-col gap-10 ">
                        {/* Name */}
                        <div className="w-full flex justify-between gap-10 items-end">
                            <div className="flex flex-col w-full">
                                <label>Name:</label>
                                <Input placeholder="Name" className="h-10"
                                    onChange={(e) => {
                                        updateDataNow("name", e.target.value)
                                    }}
                                    value={dataNow?.name}
                                />
                            </div>
                        </div>
                        {/* Username */}
                        <div className="w-full flex justify-between gap-10 items-end">
                            <div className="flex flex-col w-full">
                                <label>Display Name:</label>
                                <Input placeholder="Display Name" className="h-10"
                                    onChange={(e) => {
                                        updateDataNow("displayName", e.target.value)
                                    }}
                                    value={dataNow?.displayName}
                                />
                            </div>
                        </div>
                        {/* Email */}
                        <div className="w-full flex justify-between gap-10 items-end">
                            <div className="flex flex-col w-full">
                                <label>Email:</label>
                                <Input placeholder="Email" className="h-10" value={user?.email} disabled />
                            </div>
                        </div>
                        {/* Date Of Birth */}
                        <div className="w-full flex justify-between gap-10 items-end">
                            <div className="flex flex-col w-full">
                                <label>Date Of Birth:</label>
                                <DatePicker placeholder="Date Of Birth"
                                    value={dayjs(dataNow?.dob, "YYYY-MM-DD")}
                                    onChange={onChange}
                                    disabledDate={(current) => {
                                        return current && current > dayjs().endOf('day');
                                    }}
                                />
                            </div>
                        </div>
                        {/* Job Title */}
                        <div className="w-full flex justify-between gap-10 items-end">
                            <div className="flex flex-col w-full">
                                <label>Job Title:</label>
                                <Input placeholder="Job Title" className="h-10"
                                    onChange={(e: any) => {
                                        updateDataNow("jobTitle", e.target.value)
                                    }}
                                    value={dataNow?.jobTitle}
                                />
                            </div>
                        </div>
                        {/* Organization */}
                        <div className="w-full flex justify-between gap-10 items-end">
                            <div className="flex flex-col w-full">
                                <label>Organization:</label>
                                <Input placeholder="Organization" className="h-10" value={user?.organization?.orgName} disabled />
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <span className="text-xl uppercase font-semibold">Location and time</span>
                    <div className="p-10 shadow-lg mt-5 flex flex-col gap-10 ">
                        {/* Address */}
                        <div className="w-full flex justify-between gap-10 items-end">
                            <div className="flex flex-col w-full">
                                <label>Address:</label>
                                <Input placeholder="Address" className="h-10"
                                    onChange={(e: any) => {
                                        updateDataNow("address", e.target.value)
                                    }}
                                    value={dataNow?.address}
                                />
                            </div>
                        </div>
                        {/* Timezone */}
                        <div className="w-full flex justify-between gap-10 items-end">
                            <div className="flex flex-col w-full">
                                <label>Timezone:</label>
                                <Input placeholder="Timezone" className="h-10" />
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="w-full flex justify-end">
                        <Button className="w-24 h-10 text-white font-normal text-base"
                            onClick={userUpdateFunc}
                        >Submit</Button>
                    </div>
                    <br />
                    <br />

                </div>
            }
        </div>
    )
}
export default Profile