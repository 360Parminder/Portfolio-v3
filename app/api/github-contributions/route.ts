import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      return NextResponse.json(
        { error: "GITHUB_TOKEN is not set in environment variables" },
        { status: 500 }
      );
    }

    const query = `
      query($userName:String!) {
        user(login: $userName){
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "portfolio-github-contributions",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { userName: "360Parminder" },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("GitHub API response error:", res.status, errorData);
      return NextResponse.json(
        {
          error: "Failed to fetch from GitHub GraphQL API",
          status: res.status,
          details: errorData?.message || "Unknown error from GitHub",
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
