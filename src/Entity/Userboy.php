<?php

namespace App\Entity;

use App\Repository\UserboyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserboyRepository::class)]
class Userboy
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $username = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $email = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $password = null;

    #[ORM\OneToMany(mappedBy: 'images', targetEntity: Imageboy::class)]
    private Collection $imageboys;

    public function __construct()
    {
        $this->imageboys = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?int
    {
        return $this->username;
    }

    public function setUsername(int $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return Collection<int, Imageboy>
     */
    public function getImageboys(): Collection
    {
        return $this->imageboys;
    }

    public function addImageboy(Imageboy $imageboy): self
    {
        if (!$this->imageboys->contains($imageboy)) {
            $this->imageboys->add($imageboy);
            $imageboy->setImages($this);
        }

        return $this;
    }

    public function removeImageboy(Imageboy $imageboy): self
    {
        if ($this->imageboys->removeElement($imageboy)) {
            // set the owning side to null (unless already changed)
            if ($imageboy->getImages() === $this) {
                $imageboy->setImages(null);
            }
        }

        return $this;
    }
}
