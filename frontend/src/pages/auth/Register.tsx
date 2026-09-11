import { Link } from 'react-router-dom'
import { RegisterForm } from '@/components/features/auth/RegisterForm'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

export function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="mt-1 text-sm text-gray-500">Sign up to start playing pickleball.</p>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}