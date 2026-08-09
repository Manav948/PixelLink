"use client"
import { Check, Copy, ExternalLink, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'

interface ResultCardProps {
    result: {
        shortUrl: string,
        slug: string,
        longUrl: string
    }
}
export const ResultCard = ({ result }: ResultCardProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(result.shortUrl);
        setCopied(true);
        toast.success("hort URL copied to clipboard!");
        setTimeout(() => setCopied(false), 2500)
    }

    return (
        <div>
            <div>
                <Sparkles className='w-4 h-4' /> Your Shortened URL is ready!
            </div>
            <div>
                <span>
                    {result.shortUrl}
                </span>
                <div>
                    <Button
                        onClick={(handleCopy)}
                        size="sm"
                        className=''
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 text-emerald-400" /> Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" /> Copy
                            </>
                        )}
                    </Button>
                    <a
                        href={result.shortUrl}
                        target='_blank'
                        rel='noreferrer'
                        className=''
                    >
                        <ExternalLink className='' />
                    </a>
                </div>
            </div>
            <div>
                <span>Destination : </span>
                <span className=''>{result.longUrl}</span>
            </div>
        </div>
    )
}

