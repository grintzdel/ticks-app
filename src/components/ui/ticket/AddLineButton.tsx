interface AddLineButtonProps {
    onClick: () => void;
}

export function AddLineButton({ onClick }: AddLineButtonProps) {
    return (
        <div className="relative w-full flex justify-center my-8">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
            </div>
            <button
                onClick={onClick}
                className="relative w-10 h-10 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50"
            >
                <span className="text-2xl text-gray-600">+</span>
            </button>
        </div>
    );
} 