import { Input } from "@nextui-org/react"
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ComponentProps, forwardRef, useState } from "react"

type tpasswordInputProps = {
    toggleEye?: boolean,
    direction?: 'left' | 'right',
} & ComponentProps<typeof Input>

const PasswordInput = forwardRef<any, tpasswordInputProps>((props, ref) => {
    const {
        toggleEye = false,
        direction = "right",
        ...nextUIPWDinputProps
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    }

    const eyeIcon = showPassword
        ? <EyeOffIcon className="cursor-pointer" onClick={handleTogglePassword} />
        : <EyeIcon className="cursor-pointer" onClick={handleTogglePassword} />;

    const shouldRenderRight = toggleEye && direction === "right";
    const shouldRenderLeft = toggleEye && direction === "left";

    const contentRight = shouldRenderRight ? eyeIcon : null;
    const contentLeft = shouldRenderLeft ? eyeIcon : null;

    return (
        <Input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            endContent={contentRight}
            startContent={contentLeft}
            {...nextUIPWDinputProps}
        />
    )
})

export default PasswordInput;
