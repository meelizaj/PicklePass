import { Link, useLocation } from 'react-router-dom'
import { LoginForm } from '@/components/features/auth/LoginForm'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

export function LoginPage() {
  const location = useLocation()
  const redirectTo = (location.state as { from?: string } | null)?.from

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Log in to book courts and find matches.</p>
          </CardHeader>
          <CardContent>
            <LoginForm redirectTo={redirectTo} />
          </CardContent>
        </Card>
        <p className="mt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}