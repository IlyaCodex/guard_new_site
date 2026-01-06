"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./TechBackground.module.css";

const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    const resizeCanvas = () => {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      glowRadius: number;
      pulsePhase: number;

      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 2;
        this.glowRadius = this.radius * 4;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += 0.03;

        if (this.x < 0 || this.x > canvasWidth) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvasHeight) this.vy = -this.vy;

        this.x = Math.max(0, Math.min(canvasWidth, this.x));
        this.y = Math.max(0, Math.min(canvasHeight, this.y));
      }

      draw(context: CanvasRenderingContext2D) {
        const pulseFactor = Math.sin(this.pulsePhase) * 0.2 + 1;

        const glow = context.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.glowRadius * pulseFactor
        );
        glow.addColorStop(0, "rgba(233, 30, 99, 0.8)");
        glow.addColorStop(0.3, "rgba(233, 30, 99, 0.4)");
        glow.addColorStop(1, "transparent");

        context.beginPath();
        context.arc(
          this.x,
          this.y,
          this.glowRadius * pulseFactor,
          0,
          Math.PI * 2
        );
        context.fillStyle = glow;
        context.fill();

        context.beginPath();
        context.arc(this.x, this.y, this.radius * pulseFactor, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 255, 255, 0.9)";
        context.shadowBlur = 20;
        context.shadowColor = "#e91e63";
        context.fill();
        context.shadowBlur = 0;

        context.beginPath();
        context.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
        context.fillStyle = "#ffffff";
        context.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawConnections = (context: CanvasRenderingContext2D) => {
      context.save();

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 250) {
            const opacity = Math.pow(1 - distance / 250, 2);


            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(otherParticle.x, otherParticle.y);
            context.strokeStyle = `rgba(233, 30, 99, ${opacity * 0.2})`;
            context.lineWidth = 8;
            context.stroke();

            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(otherParticle.x, otherParticle.y);
            context.strokeStyle = `rgba(233, 30, 99, ${opacity * 0.4})`;
            context.lineWidth = 3;
            context.stroke();

            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(otherParticle.x, otherParticle.y);
            context.strokeStyle = `rgba(255, 100, 150, ${opacity * 0.8})`;
            context.lineWidth = 1.5;
            context.stroke();

            if (distance < 150) {
              context.beginPath();
              context.moveTo(particle.x, particle.y);
              context.lineTo(otherParticle.x, otherParticle.y);
              context.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
              context.lineWidth = 0.5;
              context.stroke();
            }

            if (distance < 100) {
              const pulse = Math.sin(Date.now() * 0.003) * 0.5 + 0.5;
              context.beginPath();
              context.moveTo(particle.x, particle.y);
              context.lineTo(otherParticle.x, otherParticle.y);
              context.strokeStyle = `rgba(255, 255, 255, ${opacity * pulse})`;
              context.lineWidth = 2;
              context.stroke();
            }
          }
        });
      });

      context.restore();
    };

    let mouseX = canvasWidth / 2;
    let mouseY = canvasHeight / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    let animationId: number;
    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      drawConnections(ctx);

      particles.forEach((particle) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200 && distance > 20) {
          particle.vx += dx * 0.00002;
          particle.vy += dy * 0.00002;

          particle.vx = Math.max(-1, Math.min(1, particle.vx));
          particle.vy = Math.max(-1, Math.min(1, particle.vy));
        }

        particle.update();
        particle.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className={styles.techBackground}>
      <canvas ref={canvasRef} className={styles.particleCanvas} />

      <motion.div
        className={styles.orb1}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={styles.orb2}
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default TechBackground;
