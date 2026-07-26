import type { VideoStyle } from "../types/domain.js";
export interface IVideoProvider { readonly name: string; generate(input: { prompt: string; style: VideoStyle; duration: number; aspectRatio: string }): Promise<{ url: string; thumbnailUrl: string; provider: string }> }
export interface IPaymentProvider { createCheckout(): Promise<{ url: string }> }
export interface IStorageProvider { upload(file: Buffer, name: string): Promise<{ url: string }> }
export interface IQueueProvider { enqueue<T>(name: string, payload: T): Promise<string> }
export interface INotificationProvider { send(input: { userId: string; title: string; body: string }): Promise<void> }
