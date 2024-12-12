import { createFileRoute } from '@tanstack/react-router'
import { InputOtp } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/auth/register/confirmation')({
    component: RouteComponent,
})

type tconfirmationForm = {
    verification_code: string;
}

function RouteComponent() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<tconfirmationForm>({
        defaultValues: {
            verification_code: "",
        },
    });
    const [rerequestTime, setRerequestTime] = useState(60);

    useEffect(() => {
        const timer = setInterval(() => {
            setRerequestTime((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const isRerequestDisabled = rerequestTime > 0;

    const onSubmit = (data: tconfirmationForm) => {
        alert(JSON.stringify(data));
    };

    const handleResendCode = () => {
        if (isRerequestDisabled) return;
        setRerequestTime(60);
    }

    return (
        <form
            className="flex flex-col gap-4 w-full max-w-[300px]"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="info">
                <h1 className="text text-lg/10 font-bold">
                    Verification Code
                </h1>
                <span className="opacity-75 text-sm" >
                    Enter the verification code sent to your email address
                </span>
            </div>
            <Controller
                control={control}
                name="verification_code"
                render={({ field }) => (
                    <InputOtp
                        {...field}
                        errorMessage={errors.verification_code && errors.verification_code.message}
                        isInvalid={!!errors.verification_code}
                        length={6}
                        classNames={{
                            errorMessage: "font-medium",
                        }}
                    />
                )}
                rules={{
                    required: "Verification Code is required",
                    minLength: {
                        value: 6,
                        message: "Please enter a valid Verification Code",
                    },
                }}
            />
            <div className="btns flex gap-2.5 ">
                <Button
                    fullWidth
                    className="max-w-fit"
                    isDisabled={isRerequestDisabled}
                    type="reset"
                    onPress={handleResendCode}
                >
                    Resend Code {rerequestTime > 0 && `(${rerequestTime}s)`}
                </Button>

                <Button
                    fullWidth
                    className="bg-primary"
                    type="submit"
                    variant="flat"
                >
                    Verify
                </Button>
            </div>
        </form>
    );
}
