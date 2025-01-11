'use client'

import React, {useState} from 'react'
import TogglePasswdVisibility from '@/components/SVG/TogglePasswdVisibility'

interface FormFieldProps {
    label: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
}

export default function FormField({
                                      label,
                                      type,
                                      value,
                                      onChange,
                                      placeholder,
                                      required = false
                                  }: FormFieldProps) {
    const [showPassword, setShowPassword] = useState(false)
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

    return (
        <div className="mb-7 md:mb-5">
            <label className="block mb-[6px] font-medium text-[13px]
      md:text-lg md:mb-[9px]">
                {label}
            </label>
            <div className="relative">
                <input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    className="w-full p-3 border-[1.15px] rounded-xl border-[#D4D7E3] bg-[#F7FBFF] text-[#8897AD] font-light text-[13px] md:text-lg md:p-[18px]"
                    placeholder={placeholder}
                    required={required}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer md:right-[18px]"
                    >
                        <TogglePasswdVisibility/>
                    </button>
                )}
            </div>
        </div>
    )
}