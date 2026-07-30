import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

type MaterialIconVariant = 'outlined' | 'rounded' | 'sharp';

type MaterialIconProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
    icon: string;
    variant?: MaterialIconVariant;
    fill?: 0 | 1;
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
    grade?: number;
    opticalSize?: number;
    label?: string;
};

export const MaterialIcon = ({
    icon,
    variant = 'outlined',
    fill = 0,
    weight = 400,
    grade = 0,
    opticalSize = 24,
    label,
    className,
    style,
    ...rest
}: MaterialIconProps) => {
    const iconClassName = `material-symbols-${variant}${className ? ` ${className}` : ''}`;
    const iconStyle: CSSProperties = {
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
        ...style,
    };

    if (label) {
        return (
            <span
                className={iconClassName}
                style={iconStyle}
                role="img"
                aria-label={label}
                {...rest}
            >
                {icon}
            </span>
        );
    }

    return (
        <span
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
            {...rest}
        >
            {icon}
        </span>
    );
};