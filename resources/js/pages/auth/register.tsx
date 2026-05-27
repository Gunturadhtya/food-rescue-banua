import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <div className="fixed inset-0 z-[9999] flex min-h-screen w-full bg-[#FDF8F0] font-sans overflow-y-auto">
            <Head title="Register" />

            <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
                
                <div className="w-full max-w-[420px] rounded-[32px] bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                    
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Sign Up</h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Enter your details below to create your account.
                        </p>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex flex-col gap-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        placeholder="Full name"
                                        className="h-12 rounded-xl border-0 bg-[#F6F4F0] px-4 text-sm focus-visible:ring-2 focus-visible:ring-[#C34A15]"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        placeholder="name@company.com"
                                        className="h-12 rounded-xl border-0 bg-[#F6F4F0] px-4 text-sm focus-visible:ring-2 focus-visible:ring-[#C34A15]"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                                        Password
                                    </Label>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        passwordrules={passwordRules}
                                        className="h-12 rounded-xl border-0 bg-[#F6F4F0] px-4 text-sm focus-visible:ring-2 focus-visible:ring-[#C34A15]"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                                        Confirm Password
                                    </Label>
                                    <PasswordInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        passwordrules={passwordRules}
                                        className="h-12 rounded-xl border-0 bg-[#F6F4F0] px-4 text-sm focus-visible:ring-2 focus-visible:ring-[#C34A15]"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-4 h-12 w-full rounded-full bg-[#C34A15] text-base font-bold text-white transition-colors hover:bg-[#A33D10]"
                                    tabIndex={5}
                                    data-test="register-user-button"
                                    disabled={processing}
                                >
                                    {processing && <Spinner className="mr-2" />}
                                    Create account
                                </Button>

                                <div className="relative my-1">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                                        <span className="bg-white px-3 text-gray-400">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>
                                
                                <Button 
                                    variant="outline" 
                                    type="button" 
                                    className="h-12 w-full rounded-full border border-gray-200 bg-white font-bold text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                    Sign up with Google
                                </Button>

                                <div className="mt-2 text-center text-xs font-medium text-gray-500">
                                    Already have an account?{' '}
                                    <TextLink href={login()} tabIndex={6} className="font-bold text-[#C34A15] hover:underline">
                                        Log In
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>

            <div className="relative hidden w-1/2 lg:block">
                <img
                    src="/images/croissant-bg.png"
                    alt="Food Rescue Banua"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
                    <div className="text-xl font-extrabold italic tracking-wider text-right">
                        Food Rescue Banua
                    </div>
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold leading-[1.15] tracking-tight text-right">
                            Rescue Food,<br />Save Money
                        </h1>
                    </div>
                </div>
            </div>

        </div>
    );
}

Register.layout = (page: any) => page;