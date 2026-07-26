import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout";
import { Auth, Dashboard, HistoryPage, Landing, NotFound, ProfilePage, SettingsPage, VideosPage } from "@/pages";
import { session } from "@/lib/api";
const Protected = () => session.token ? <AppLayout/> : <Navigate to="/login" replace/>;
export default function App() { return <Routes><Route path="/" element={<Landing/>}/><Route path="/login" element={<Auth/>}/><Route path="/register" element={<Auth register/>}/><Route element={<Protected/>}><Route path="/dashboard" element={<Dashboard/>}/><Route path="/history" element={<HistoryPage/>}/><Route path="/favorites" element={<VideosPage favorites/>}/><Route path="/profile" element={<ProfilePage/>}/><Route path="/settings" element={<SettingsPage/>}/></Route><Route path="*" element={<NotFound/>}/></Routes> }
