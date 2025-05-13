'use client'
import useAuth from '@/hooks/use-auth'
import { Button } from '../ui/button'
import { UserMenu } from './user-menu'

const AuthContainer = () => {
	const { openDialog, isAuthenticated } = useAuth()

	return (
		<div>
			{
				isAuthenticated ? (
					<>
						<UserMenu />
					</>
				) : (
					<div className="flex-1 flex justify-end">
						<Button onClick={openDialog}>
							Login
						</Button>
					</div>
				)
			}
		</div>
	)
}

export default AuthContainer