import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

/**
 * Design System: Academic Elegance with Interactive Depth
 * - Typography: Playfair Display (headings) + Inter (body) + IBM Plex Mono (formulas)
 * - Colors: Navy (#1a3a52) + Burnt Orange (#c85a17) + Soft Grays
 * - Layout: Split-screen comparisons with diagonal cuts and asymmetric sections
 */

export default function Home() {
  const [, navigate] = useLocation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-primary">Risk Indices</div>
          <div className="flex gap-6">
            <a href="#comparison" className="text-sm font-medium hover:text-accent transition">
              Comparison
            </a>
            <a href="#calculator" className="text-sm font-medium hover:text-accent transition">
              Calculator
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-accent transition">
              FAQ
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663193380074/eGFbbXC5JhxYJyRffYbFsj/hero-abstract-financial-EyMKgv8obpp8jCjZfhZptg.webp')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-white/70"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6">
              Understanding Risk Indices
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
              Explore the Aumann-Serrano and Foster-Hart risk indices—two fundamental approaches to quantifying
              financial risk. Compare their theories, applications, and practical implications side-by-side.
            </p>
            <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white"
              onClick={() => navigate("/calculator")}
            >
              Start Exploring
            </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-primary/60" />
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-24 bg-secondary/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Side-by-Side Comparison</h2>
            <p className="text-lg text-foreground/70">
              Understand the key differences between AS and FH indices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* AS Index Card */}
            <Card className="p-8 border-2 border-border hover:border-accent transition-colors">
              <div className="mb-6">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663193380074/eGFbbXC5JhxYJyRffYbFsj/as-index-concept-3tRg2C94mtTxoe8hY94jhB.webp"
                  alt="Aumann-Serrano Index"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">Aumann-Serrano (AS) Index</h3>
              <p className="text-foreground/70 mb-4">
                Based on <strong>risk aversion</strong>, measuring the critical risk tolerance at which a gamble becomes
                break-even.
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-primary">Theoretical Basis:</span>
                  <p className="text-foreground/70">Expected Utility Theory (CARA utility)</p>
                </div>
                <div>
                  <span className="font-semibold text-primary">Focus:</span>
                  <p className="text-foreground/70">How much compensation is needed for a given risk</p>
                </div>
                <div>
                  <span className="font-semibold text-primary">Formula:</span>
                  <p className="font-mono text-xs bg-muted p-2 rounded">E[exp(-g/R_AS)] = 1</p>
                </div>
              </div>
            </Card>

            {/* FH Index Card */}
            <Card className="p-8 border-2 border-border hover:border-accent transition-colors">
              <div className="mb-6">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663193380074/eGFbbXC5JhxYJyRffYbFsj/fh-index-concept-myUoXPxApKwGoygzXBYk6a.webp"
                  alt="Foster-Hart Measure"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">Foster-Hart (FH) Measure</h3>
              <p className="text-foreground/70 mb-4">
                Based on <strong>survival and bankruptcy</strong>, identifying the minimum wealth required to safely
                accept a gamble.
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-primary">Theoretical Basis:</span>
                  <p className="text-foreground/70">Repeated Gambles / Kelly Criterion (Logarithmic utility)</p>
                </div>
                <div>
                  <span className="font-semibold text-primary">Focus:</span>
                  <p className="text-foreground/70">How much capital is needed to safely undertake a risk</p>
                </div>
                <div>
                  <span className="font-semibold text-primary">Formula:</span>
                  <p className="font-mono text-xs bg-muted p-2 rounded">E[ln(1 + g/R_FH)] = 0</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Detailed Feature Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border border-border p-4 text-left font-semibold">Feature</th>
                  <th className="border border-border p-4 text-left font-semibold">Aumann-Serrano (AS)</th>
                  <th className="border border-border p-4 text-left font-semibold">Foster-Hart (FH)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-secondary/30 transition">
                  <td className="border border-border p-4 font-semibold text-primary">Core Concept</td>
                  <td className="border border-border p-4">Risk Aversion / Indifference</td>
                  <td className="border border-border p-4">Survival / Bankruptcy Avoidance</td>
                </tr>
                <tr className="bg-secondary/10 hover:bg-secondary/30 transition">
                  <td className="border border-border p-4 font-semibold text-primary">Theoretical Basis</td>
                  <td className="border border-border p-4">Expected Utility Theory (CARA)</td>
                  <td className="border border-border p-4">Kelly Criterion (Logarithmic)</td>
                </tr>
                <tr className="hover:bg-secondary/30 transition">
                  <td className="border border-border p-4 font-semibold text-primary">Interpretation</td>
                  <td className="border border-border p-4">Critical risk aversion coefficient</td>
                  <td className="border border-border p-4">Critical initial wealth level</td>
                </tr>
                <tr className="bg-secondary/10 hover:bg-secondary/30 transition">
                  <td className="border border-border p-4 font-semibold text-primary">Conservatism</td>
                  <td className="border border-border p-4">Less conservative, indifference-focused</td>
                  <td className="border border-border p-4">More conservative, ruin-focused</td>
                </tr>
                <tr className="hover:bg-secondary/30 transition">
                  <td className="border border-border p-4 font-semibold text-primary">Unit</td>
                  <td className="border border-border p-4">Same as gamble (e.g., dollars)</td>
                  <td className="border border-border p-4">Same as gamble (e.g., dollars)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Analogy Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Understanding Through Analogy</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Aumann-Serrano: The Investor</h3>
              <p className="text-white/90 leading-relaxed">
                Think of the AS index as an investor asking: <strong>"How much do I need to be compensated for this
                risk?"</strong> It measures the inherent risk of an investment by finding the risk tolerance level at
                which an investor would be indifferent to taking it. A higher AS index means a riskier gamble.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Foster-Hart: The Gambler</h3>
              <p className="text-white/90 leading-relaxed">
                Think of the FH measure as a gambler asking: <strong>"How much money do I absolutely need in my account
                to ensure I won't go broke if I keep taking this bet?"</strong> It focuses on the practical implications
                of repeated exposure to risk, highlighting the minimum capital required for long-term survival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "Why are there two different risk indices?",
                a: "AS and FH approach risk from different philosophical perspectives. AS focuses on indifference and compensation, while FH focuses on survival and bankruptcy avoidance. Both are valid and useful for different contexts.",
              },
              {
                q: "Which index should I use?",
                a: "It depends on your context. Use AS for investment decisions where you're considering risk-return tradeoffs. Use FH when you're concerned about portfolio survival and avoiding ruin, especially for repeated gambles.",
              },
              {
                q: "Are these indices used in practice?",
                a: "Yes, both indices have applications in portfolio optimization, risk management, and financial decision-making. They're particularly useful in academic research and advanced financial analysis.",
              },
              {
                q: "How do these compare to standard deviation?",
                a: "Unlike standard deviation, AS and FH are objective measures that don't depend on an individual's utility function. They also account for the distribution of returns more comprehensively.",
              },
            ].map((item, idx) => (
              <div key={idx} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                  className="w-full p-6 bg-card hover:bg-secondary/10 transition flex items-center justify-between text-left"
                >
                  <h3 className="font-semibold text-primary text-lg">{item.q}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-accent transition-transform ${expandedIndex === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedIndex === idx && (
                  <div className="p-6 bg-secondary/5 border-t border-border">
                    <p className="text-foreground/80 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore Further?</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Use our interactive calculator to see how AS and FH indices behave with different gambles and parameters.
          </p>
          <Button
            size="lg"
            className="bg-white text-accent hover:bg-white/90"
            onClick={() => navigate("/calculator")}
          >
            Try the Calculator
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <p className="text-white/70 text-sm">
                An interactive guide to understanding Aumann-Serrano and Foster-Hart risk indices.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Research Papers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    References
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-white/70 text-sm">Questions? Reach out to learn more.</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2026 Risk Indices Guide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
